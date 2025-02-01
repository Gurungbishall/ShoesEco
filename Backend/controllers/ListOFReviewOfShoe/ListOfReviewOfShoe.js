import pool from "../../Database/db.js";

const listOfReviewOfShoe = async (req, res) => {
  const { shoe_id } = req.query;

  if (!shoe_id)
    return res.status(400).json({
      message: "No shoe id provided",
    });

  try {
    const result = await pool.query(
      `SELECT rating, review_text FROM reviews WHERE shoe_id = $1`,
      [shoe_id]
    );

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
