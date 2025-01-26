import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import adidas from "../../../pictures/AdidasResponseCLCrystalWhite.png";

type CheckOutItem = {
  cart_item_id: number;
  color: string;
  description: string;
  model_name: string;
  price: string;
  quantity: number;
  shoe_id: number;
  size: string;
};

type CheckOutResponse = {
  cart_id: number;
  items: CheckOutItem[];
};

export default function CheckOutComponent() {
  const [shoes, setShoes] = useState<CheckOutItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const navigate = useNavigate();

  const toggleHome = () => {
    navigate("/cart");
  };

  const fetchCheckOutData = async () => {
    const customer_id = sessionStorage.getItem("customer_id");

    if (!customer_id) {
      setError("Customer ID is missing. Please log in.");
      return;
    }

    try {
      const response = await axios.get<CheckOutResponse>(
        `http://localhost:3000/user/showcart?customer_id=${customer_id}`
      );
      const fetchedItems = response.data.items;
      setShoes(fetchedItems);

      const initialQuantities = fetchedItems.reduce((acc, shoe) => {
        acc[shoe.cart_item_id] = shoe.quantity;
        return acc;
      }, {} as Record<number, number>);

      setQuantities(initialQuantities);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred while fetching the cart.");
      }
    }
  };

  useEffect(() => {
    fetchCheckOutData();
  }, []);

  const handleShoeClick = (shoeId: number) => {
    navigate("/shoe", {
      state: { shoeId, from: location.pathname },
    });
  };

  const SendOrderList = async () => {
    const customer_id = sessionStorage.getItem("customer_id");

    if (!customer_id) {
      setError("Customer ID is missing. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/ordershoes",
        {
          customer_id: customer_id,
          items: shoes.map((shoe) => ({
            shoe_id: shoe.shoe_id,
            quantity: quantities[shoe.cart_item_id] || shoe.quantity,
          })),
        }
      );

      navigate("/order", {
        state: { orderId: response.data.order_id },
      });
    } catch (error) {
      setError("Failed to place the order. Please try again.");
    }
  };

  return (
    <>
      <div className="p-6 flex flex-col gap-5 p">
        <div className="flex items-center gap-3">
          <i
            className="fa-solid fa-arrow-left fa-2x cursor-pointer"
            onClick={toggleHome}
          />
          <span className="text-2xl font-bold">CheckOut</span>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-xl font-bold">Shipping Address</span>
          <span>Home</span>
        </div>
        <div className="flex flex-col gap-3 pb-20">
          <span className="text-xl font-bold">Order List</span>
          {shoes.map((shoe) => (
            <div
              key={shoe.cart_item_id}
              className="flex gap-4 bg-slate-100 rounded-3xl relative"
              onClick={() => handleShoeClick(shoe.shoe_id)}
            >
              <img
                src={adidas}
                alt="adidas"
                className="size-32 bg-slate-200 rounded-lg"
              />

              <div className="w-full p-2 flex flex-col gap-3">
                <div className="flex text-xl font-bold">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]">
                    {shoe.model_name}
                  </span>
                </div>
                <div className="flex gap-2 text-zinc-600">
                  <span>Color = {shoe.color}</span>|
                  <span>Size = {shoe.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${shoe.price}</span>
                  <span className="size-7 flex items-center justify-center bg-stone-300 rounded-full">
                    {quantities[shoe.cart_item_id] || shoe.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-2">
        <div
          className="w-full py-2 font-bold text-xl text-white text-center rounded-2xl bg-black cursor-pointer "
          onClick={SendOrderList}
        >
          Continue to payment
        </div>
      </div>
    </>
  );
}
