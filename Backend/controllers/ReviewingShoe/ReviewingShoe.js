import pool from "../../Database/db.js";

const reviewShoe = async (req, res) => {
  const { customer_id, shoe_id, rating, review_text } = req.body;

  if (!customer_id || !shoe_id || rating === undefined) {
    return res.status(400).json({ message: "Customer ID, Shoe ID, and Rating are required." });
  }

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 0 and 5." });
  }

  try {
    const existingReview = await pool.query(
      "SELECT * FROM reviews WHERE customer_id = $1 AND shoe_id = $2",
      [customer_id, shoe_id]
    );

    if (existingReview.rows.length > 0) {
      await pool.query(
        "UPDATE reviews SET rating = $1, review_text = $2 WHERE customer_id = $3 AND shoe_id = $4",
        [rating, review_text, customer_id, shoe_id]
      );
      return res.status(200).json({
        message: "Review updated successfully!",
      });
    } else {
      await pool.query(
        "INSERT INTO reviews (customer_id, shoe_id, rating, review_text) VALUES ($1, $2, $3, $4)",
        [customer_id, shoe_id, rating, review_text]
      );
      return res.status(200).json({
        message: "Review added successfully!",
      });
    }
  } catch (err) {
    console.error("Error adding or updating review:", err);
    res.status(500).json({ message: "Failed to add or update review." });
  }
};

export { reviewShoe };
