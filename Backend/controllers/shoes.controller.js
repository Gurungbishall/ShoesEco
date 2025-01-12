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
      
      query += ' LIMIT 6';
      
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

    res.json(result.rows[0]); 
  } catch (error) {
    console.error("Error fetching shoe data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addShoe = async (req, res) => {
  const { customer_id, shoe_id, quantity } = req.body;

  try {
    let result = await pool.query(
      'SELECT cart_id FROM shopping_cart WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 1',
      [customer_id]
    );
    
    let cart_id;

    if (result.rows.length > 0) {
        cart_id = result.rows[0].cart_id;
    } else {
        result = await pool.query('INSERT INTO shopping_cart (customer_id) VALUES ($1) RETURNING cart_id', [customer_id]);
        cart_id = result.rows[0].cart_id;
    }

    result = await pool.query(
        'SELECT quantity FROM cart_items WHERE cart_id = $1 AND shoe_id = $2', 
        [cart_id, shoe_id]
    );

    if (result.rows.length > 0) {
        await pool.query(
            'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND shoe_id = $3',
            [quantity, cart_id, shoe_id]
        );
    } else {
        await pool.query(
            'INSERT INTO cart_items (cart_id, shoe_id, quantity) VALUES ($1, $2, $3)',
            [cart_id, shoe_id, quantity]
        );
    }

    res.status(200).json({ message: 'Shoe added to cart successfully!' });

  } catch (err) {
    console.error('Error adding shoe to cart:', err);
    res.status(500).json({ message: 'Failed to add shoe to cart.' });
  }
}

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


export { showShoes,displayIndividualShoe,addShoe, searchShoes };
