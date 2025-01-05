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

export { showShoes };
