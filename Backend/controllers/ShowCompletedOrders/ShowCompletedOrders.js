import pool from "../../Database/db.js";

const showCompletedOrder = async (req, res) => {
  const { customer_id } = req.query;

  if (!customer_id) {
    return res.status(400).json({ message: "Error: customer_id is required" });
  }

  try {
    let result = await pool.query(
      `SELECT oi.order_item_id, oi.quantity, oi.price, s.shoe_id, s.model_name, s.color, s.size
       FROM orders o
       JOIN order_items oi ON o.order_id = oi.order_id
       JOIN shoes s ON oi.shoe_id = s.shoe_id
       WHERE o.customer_id = $1 AND o.status = $2`,
      [customer_id, "Done"]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No Pending Orders" });
    }

    let shoes = result.rows.map((row) => ({
      order_item_id: row.order_item_id,
      shoe_id: row.shoe_id,
      model_name: row.model_name,
      color: row.color,
      size: row.size,
      price: row.price,
      quantity: row.quantity,
    }));

    return res.status(200).json(shoes); 
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

  export {showCompletedOrder};