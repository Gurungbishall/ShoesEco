import pool from "../../Database/db.js";

const searchShoes = async (req, res) => {
    const { model_name } = req.query;  
  
    if (!model_name) {
      return res.status(400).json({ message: "Model name is required" });
    }
  
    try {
      const result = await pool.query(
       "SELECT * FROM shoes WHERE model_name ILIKE $1", [`%${model_name}%`] 
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No shoes found" });
      }
      return res.status(200).json({
        data: result.rows
    });
    } catch (error) {
      console.error("Error searching", error);
      res.status(500).json({ message: "Internal server Error" });
    }
  };
  
  export {searchShoes};