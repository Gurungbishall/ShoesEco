import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import axiosJWT from "../../RefreshTheToken/RefreshTheToken";
import adidas from "../../../pictures/AdidasResponseCLCrystalWhite.png";
import TotalMoneyAndCheckOutbutton from "./TotalMoneyAndCheckOutbutton";
import Navbar from "../Navbar/Navbar";
import DeleteItem from "./DeleteCartComponent";
import Container from "../../Container";

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
  total_price: number;
};

export default function CartComponent() {
  const [shoes, setShoes] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [selectedShoe, setSelectedShoe] = useState<CartItem | null>(null);
  const navigate = useNavigate();

  const increaseQuantity = (cart_item_id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [cart_item_id]: (prev[cart_item_id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (cart_item_id: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[cart_item_id] || 0;
      if (currentQuantity > 1) {
        return {
          ...prev,
          [cart_item_id]: currentQuantity - 1,
        };
      }
      return prev;
    });
  };

  const fetchCartData = async () => {
    const customer_id = sessionStorage.getItem("customer_id");
    const accessToken = Cookies.get("accessToken");

    if (!customer_id) {
      setError("Please log in.");
      return;
    }

    try {
      const response = await axiosJWT.get<CartResponse>(
        `http://localhost:3000/user/showcart?customer_id=${customer_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      const fetchedItems = response.data.items;
      setShoes(fetchedItems);
      setTotalPrice(response.data.total_price);

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
    fetchCartData();
  }, []);

  const loadingDeleteMenu = (shoe: CartItem) => {
    setSelectedShoe(shoe);
    setLoadingDelete(true);
  };

  const closingDeleteMenu = () => {
    setLoadingDelete(false);
  };

  const deleteCartItem = async (cart_item_id: number) => {
    try {
      const customer_id = sessionStorage.getItem("customer_id");
      const accessToken = Cookies.get("accessToken");

      if (!customer_id) {
        setError("Please log in.");
        return;
      }

      const itemToDelete = shoes.find(
        (item) => item.cart_item_id === cart_item_id
      );
      const itemPrice = itemToDelete ? parseFloat(itemToDelete.price) : 0;

      await axios.post(
        "http://localhost:3000/user/deletecartitem",
        { cart_item_id },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      setTotalPrice((prevTotal) => prevTotal - itemPrice);

      setShoes((prevItems) =>
        prevItems.filter((item) => item.cart_item_id !== cart_item_id)
      );
      setQuantities((prevQuantities) => {
        const { [cart_item_id]: _, ...rest } = prevQuantities;
        return rest;
      });

      setLoadingDelete(false);

      if (shoes.length === 1) {
        setError("Cart is empty");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Error deleting item from the cart.");
    }
  };

  return (
    <>
      <Container>
        <div className="top-0 left-0 w-full z-10 p-4 fixed flex flex-col gap-2 bg-white">
          <span className="text-2xl font-bold">My Cart</span>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-4">
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-10 pb-40 overflow-y-auto">
          {shoes.map((shoe) => (
            <div
              key={shoe.cart_item_id}
              className="flex gap-4 bg-slate-100 rounded-3xl relative cursor-pointer"
              onClick={() => {
                navigate("/shoe", {
                  state: { shoeId: shoe.shoe_id, from: location.pathname },
                });
              }}
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
                  <i
                    className="bx bx-x bx-sm absolute right-2 top-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      loadingDeleteMenu(shoe);
                    }}
                  />
                </div>
                <div className="flex gap-2 text-zinc-600">
                  <span>Color = {shoe.color}</span>|
                  <span>Size = {shoe.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${shoe.price}</span>
                  <span className="px-1 h-10 flex gap-2 items-center justify-center text-lg rounded-2xl bg-stone-300">
                    <i
                      className="bx bx-minus bx-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        decreaseQuantity(shoe.cart_item_id);
                      }}
                    />
                    {quantities[shoe.cart_item_id] || shoe.quantity}
                    <i
                      className="bx bx-plus bx-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseQuantity(shoe.cart_item_id);
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {loadingDelete && selectedShoe && (
        <div className="fixed inset-0 flex flex-col w-full bg-black bg-opacity-50">
          <div className="h-1/2" />
          <DeleteItem
            deleteCartItem={deleteCartItem}
            shoe={selectedShoe}
            closeMenu={closingDeleteMenu}
          />
        </div>
      )}

      {!error && !loadingDelete && (
        <TotalMoneyAndCheckOutbutton TotalPrice={TotalPrice} />
      )}
      {!loadingDelete && <Navbar />}
    </>
  );
}
