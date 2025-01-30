import pool from "../../Database/db.js";

const orderShoes = async (req, res) => {
    const { customer_id, items } = req.body;
  
    if (!customer_id || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data.' });
    }
  
    try {
      await pool.query('BEGIN');
  
      const orderResult = await pool.query(
        'INSERT INTO orders (customer_id) VALUES ($1) RETURNING order_id',
        [customer_id]
      );
  
      const order_id = orderResult.rows[0].order_id;
  
      for (const item of items) {
        const { shoe_id, quantity, price } = item;
  
        const shoeResult = await pool.query(
          'SELECT stock_quantity, price FROM shoes WHERE shoe_id = $1',
          [shoe_id]
        );
  
        if (shoeResult.rows.length === 0) {
          throw new Error('Shoe not found.');
        }
  
        const shoe = shoeResult.rows[0];
        const stock_quantity = shoe.stock_quantity;
  
        if (stock_quantity < quantity) {
          throw new Error(`Not enough stock for shoe ID ${shoe_id}.`);
        }
  
        await pool.query(
          'INSERT INTO order_items (order_id, shoe_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [order_id, shoe_id, quantity, price || shoe.price] 
        );
  
        await pool.query(
          'UPDATE shoes SET stock_quantity = stock_quantity - $1 WHERE shoe_id = $2',
          [quantity, shoe_id]
        );
      }
  
      await pool.query(
        'DELETE FROM cart_items WHERE cart_id = (SELECT cart_id FROM shopping_cart WHERE customer_id = $1)',
        [customer_id]
      );
  
      await pool.query('COMMIT');
      
      return res.status(201).json({ message: 'Order placed successfully.', order_id });
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while placing the order.' });
    }
  };

  export {orderShoes};
  