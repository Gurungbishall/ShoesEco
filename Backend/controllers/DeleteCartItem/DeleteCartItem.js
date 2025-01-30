import pool from "../../Database/db.js";

const deleteCartItem = async (req, res) => {
    const { cart_item_id} = req.body;
     
    if(!cart_item_id){
      return res.status(400).json({message: "Required cart item id"})
    }
  
    try{
      
      await pool.query(
        'DELETE FROM cart_items WHERE cart_item_id = $1', [cart_item_id])
        
  
       return res.status(200).json({
        message: "Successfully delete"
       }) 
    }catch(error){
      console.error("Error fetching cart:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  
  }

 export {deleteCartItem}; 