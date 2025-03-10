import bcrypt from "bcrypt";
import pool from "../Database/db.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../model/user.model.js";

const userlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const query =
      "SELECT customer_id, full_name, password, is_admin FROM customers WHERE email = $1";
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Login successful",
      name: user.full_name,
      user_id: user.customer_id,
      is_admin: user.is_admin,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userSignOut = (req, res) => {
  res.cookie("refresh_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.Status(200).json({ message: "Logout successful" });
};

const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUserQuery = await pool.query(
      `SELECT * FROM customers WHERE email = $1`,
      [email]
    );
    if (checkUserQuery.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO customers (email, password) 
       VALUES ($1, $2) 
       RETURNING customer_id, email`,
      [email, hashedPassword]
    );

    return res.status(201).json({
      message: "User signed up successfully",
      user: {
        customer_id: result.rows[0].customer_id,
        email: result.rows[0].email,
      },
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const customerId = req.query.customer_id;

  if (!customerId) {
    return res.status(400).json({ message: "Customer ID is required" });
  }

  try {
    const result = await pool.query(
      "SELECT full_name, email, phone_number FROM customers WHERE customer_id = $1",
      [customerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req, res) => {
  const { full_name, email, phone_number, customer_id } = req.body;

  if (!full_name || !email || !phone_number || !customer_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const checkUserQuery = await pool.query(
      `SELECT * FROM customers WHERE email = $1 AND customer_id != $2`,
      [email, customer_id]
    );

    if (checkUserQuery.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const result = await pool.query(
      `UPDATE customers 
       SET full_name = $1, email = $2, phone_number = $3
       WHERE customer_id = $4
       RETURNING customer_id, full_name, email, phone_number`,
      [full_name, email, phone_number, customer_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User profile updated successfully",
      user: {
        customer_id: result.rows[0].customer_id,
        full_name: result.rows[0].full_name,
        email: result.rows[0].email,
        phone_number: result.rows[0].phone_number,
      },
    });
  } catch (error) {
    console.error("Error editing profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { userlogin, userSignOut, userSignUp, getProfile, editProfile };
