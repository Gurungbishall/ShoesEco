import pool from "../../Database/db.js";

const displayIndividualShoe = async (req, res) => {
    const shoe_id = req.query.shoe_id;
  
    if (!shoe_id) {
      return res.status(400).json({ message: "No Shoe Id provided" });
    }
  
    try {
      const result = await pool.query(
        "SELECT * FROM shoes WHERE shoe_id = $1", [shoe_id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Shoe not found" });
      }
  
      res.json(result.rows[0]); 
    } catch (error) {
      console.error("Error fetching shoe data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  export {displayIndividualShoe}