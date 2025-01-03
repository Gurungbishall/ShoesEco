import pool from "../Database/db.js";

const showAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM shoes');
        
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

export {showAll};