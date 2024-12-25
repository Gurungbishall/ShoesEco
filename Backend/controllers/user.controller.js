import bcrypt from "bcrypt";
import pool from "../Database/db.js";

const userlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const query = "SELECT * FROM customers WHERE email = $1";
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
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

export default { userlogin, userSignUp };
