import pool from "../../Database/db.js";

const showCart = async (req, res) => {
  const { customer_id } = req.query;

  try {
    let result = await pool.query(
      "SELECT cart_id FROM shopping_cart WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 1",
      [customer_id]
    );

    let cart_id;

    if (result.rows.length > 0) {
      cart_id = result.rows[0].cart_id;
    } else {
      return res
        .status(404)
        .json({ message: "No cart found for this customer." });
    }

    result = await pool.query(
      `SELECT ci.cart_item_id, ci.quantity, s.shoe_id, s.model_name, s.size, s.color, s.price, s.description
         FROM cart_items ci
         JOIN shoes s ON ci.shoe_id = s.shoe_id
         WHERE ci.cart_id = $1`,
      [cart_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    return res.status(200).json({
      cart_id,
      items: result.rows,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { showCart };
