import { useEffect } from "react";
import axios from "axios";

export default function CartComponent() {
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/showcart?customer_id=${1}`
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchCartData();
  }, []);
  return (
    <>
      <div className="p-6 flex flex-col gap-3">
        <div>
          <span className="text-xl font-bold">My Cart</span>
        </div>
      </div>
    </>
  );
}
