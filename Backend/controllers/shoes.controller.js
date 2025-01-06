import pool from "../Database/db.js";

const showShoes = async (req, res) => {
    try {
        const { brand_name } = req.query;  
        
        let query = 'SELECT * FROM shoes';
        let values = [];

        if (brand_name) {
           
            const brandResult = await pool.query('SELECT brand_id FROM brands WHERE brand_name = $1', [brand_name]);
            if (brandResult.rows.length === 0) {
                return res.status(400).json({
                    message: 'Brand not found'
                });
            }
            const brandId = brandResult.rows[0].brand_id;
            query += ' WHERE brand_id = $1';
            values = [brandId];
        }
        
        const result = await pool.query(query, values);
        
        if (result.rows.length === 0) {
            return res.status(400).json({
                message: 'No shoes available'
            });
        }

        return res.status(200).json({
            message: 'Shoes found',
            data: result.rows
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};

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

    res.json(result.rows[0]); // Send the shoe data back
  } catch (error) {
    console.error("Error fetching shoe data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

  

export { showShoes,displayIndividualShoe };
