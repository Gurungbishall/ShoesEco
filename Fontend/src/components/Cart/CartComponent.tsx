import { useEffect, useState } from "react";
import axios from "axios";
import adidas from "../../pictures/AdidasResponseCLCrystalWhite.png";

type CartItem = {
  cart_item_id: number;
  color: string;
  description: string;
  model_name: string;
  price: string;
  quantity: number;
  shoe_id: number;
  size: string;
};

type CartResponse = {
  cart_id: number;
  items: CartItem[];
};

export default function CartComponent() {
  const [shoes, setShoes] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCartData = async () => {
    const customer_id = sessionStorage.getItem("customer_id");

    if (!customer_id) {
      setError("Customer ID is missing. Please log in.");
      return;
    }

    try {
      const response = await axios.get<CartResponse>(
        `http://localhost:3000/user/showcart?customer_id=${customer_id}`
      );
      const fetchedItems = response.data.items;
      setShoes(fetchedItems);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred while fetching the cart.");
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const deleteCartItem = async (cart_item_id: number) => {
    try {
      const customer_id = sessionStorage.getItem("customer_id");

      if (!customer_id) {
        setError("Customer ID is missing. Please log in.");
        return;
      }

      await axios.post("http://localhost:3000/user/deletecartitem", {
        cart_item_id: cart_item_id,
      });

      setShoes((prevItems) =>
        prevItems.filter((item) => item.cart_item_id !== cart_item_id)
      );
      if (shoes.length === 1) {
        setError("Cart is empty");
      }
      console.log("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Error deleting item from the cart.");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-3">
      <div>
        <span className="text-2xl font-bold">My Cart</span>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {shoes.map((shoe) => (
          <div
            key={shoe.cart_item_id}
            className="p-4 flex gap-4 bg-slate-100 rounded-3xl relative"
          >
            <img
              src={adidas}
              alt="adidas"
              className="size-32 bg-slate-200 rounded-lg"
            />
            <div>
              <div className="flex text-xl font-bold">
                <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]">
                  {shoe.model_name}
                </span>
                <i
                  className="bx bx-x bx-sm absolute right-2 top-4 cursor-pointer"
                  onClick={() => deleteCartItem(shoe.cart_item_id)}
                />
              </div>

              <p>Quantity: {shoe.quantity}</p>
              <p>Price: ${shoe.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
