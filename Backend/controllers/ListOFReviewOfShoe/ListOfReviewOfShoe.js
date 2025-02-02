import pool from "../../Database/db.js";

const listOfReviewOfShoe = async (req, res) => {
  const { shoe_id, rating_number } = req.query;

  if (!shoe_id)
    return res.status(400).json({
      message: "No shoe id provided",
    });

  if (rating_number && ![1, 2, 3, 4, 5].includes(Number(rating_number))) {
    return res.status(400).json({
      message:
        "Invalid rating number, please provide a rating between 1 and 5.",
    });
  }

  let query = `
    SELECT 
      c.full_name AS customer_name, 
      r.rating, 
      r.review_text, 
      r.review_date 
    FROM reviews r
    JOIN customers c ON r.customer_id = c.customer_id
    WHERE r.shoe_id = $1`;

  if (rating_number) {
    query += ` AND r.rating = $2`;
  }

  try {
    const values = rating_number ? [shoe_id, rating_number] : [shoe_id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "No reviews found for this shoe" });

    res.status(200).json({
      message: "Reviews found",
      data: result.rows,
    });
  } catch (err) {
    console.error("Error displaying review:", err);
    res.status(500).json({ message: "Failed to display review." });
  }
};


export { listOfReviewOfShoe };
