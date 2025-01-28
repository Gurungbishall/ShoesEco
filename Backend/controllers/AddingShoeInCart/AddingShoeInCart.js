import pool from "../../Database/db.js";

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

  export {addShoe}