import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import adidas from "../../../pictures/AdidasResponseCLCrystalWhite.png";
import axiosJWT from "../../RefreshTheToken/RefreshTheToken";

const baseURL = import.meta.env.VITE_BACKEND_URL;

type PendingOrderItem = {
  order_item_id: number;
  color: string;
  model_name: string;
  price: string;
  quantity: number;
  shoe_id: number;
  size: string;
};

export default function PendingOrderComponent({
  setError,
  handleShoeClick,
}: {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  handleShoeClick: (shoe_id: number) => void;
}) {
  const [shoes, setShoes] = useState<PendingOrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPendingOrderData = async () => {
    const accessToken = Cookies.get("accessToken");
    const customer_id = sessionStorage.getItem("customer_id");

    if (!customer_id) {
      setError("Please log in.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await axiosJWT.get<PendingOrderItem[]>(
        `${baseURL}/user/pendingorder?customer_id=${customer_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      setShoes(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred while fetching the orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {shoes.length === 0 ? (
        <div>No Pending Orders</div>
      ) : (
        shoes.map((shoe) => (
          <div
            key={shoe.order_item_id}
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
                <span className="text-zinc-600">Qty = {shoe.quantity}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
