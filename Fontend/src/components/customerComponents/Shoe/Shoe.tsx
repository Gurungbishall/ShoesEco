import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import adidas from "../../../pictures/AdidasResponseCLCrystalWhite.png";
import ReviewListComponent from "../ReviewList/ReviewListComponent";
import LeaveReviewComponent from "../LeaveReview/leaveReview";

const baseURL = import.meta.env.VITE_BACKEND_URL;

type Shoe = {
  shoe_id: number;
  brand_id: number;
  model_name: string;
  color: string;
  description: string;
  price: string;
  size: string;
  stock_quantity: number;
  average_rating: number;
};

export default function ShoeDetail() {
  const location = useLocation();
  const shoeId = location.state?.shoeId;
  const previousRoute = location.state?.from;
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingReviewList, setLoadingReviewList] = useState<boolean>(false);
  const [loadingLeaveReview, setLoadingLeaveReview] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  const customer_id = sessionStorage.getItem("customer_id");

  useEffect(() => {
    if (!shoeId) return;

    axios
      .get(`${baseURL}/shoes/shoe?shoe_id=${shoeId}`)
      .then((response) => {
        setShoe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shoe data:", error);
        setLoading(false);
      });
  }, [shoeId]);

  if (loading) return <div>Loading...</div>;

  if (!shoe) return <div>No shoe found</div>;

  const addShoeToCart = async () => {
    const accessToken = Cookies.get("accessToken");

    try {
      const response = await axios.post(
        `${baseURL}/shoes/addshoe`,
        {
          customer_id: customer_id,
          shoe_id: shoeId,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error adding shoe to cart:", error);
      alert("Failed to add shoe to cart.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <i
          className="absolute left-4 pt-4 fa-solid fa-arrow-left fa-2x cursor-pointer"
          onClick={() => {
            navigate(previousRoute);
          }}
        />
        <img src={adidas} alt="shoe" className="bg-slate-300" />
        <div className="px-4 flex flex-col ">
          <div className="py-3 flex flex-col gap-4 border-b-2">
            <span className="text-3xl font-bold">{shoe.model_name}</span>
            <div className="flex items-center justify-between">
              <span
                onClick={() => {
                  setLoadingReviewList(true);
                }}
              >
                <i className="bx bxs-star-half" /> {shoe.average_rating}
              </span>
              <div
                className="w-5/12 p-2 text-center text-white font-bold rounded-full bg-black cursor-pointer"
                onClick={() => {
                  setLoadingLeaveReview(true);
                }}
              >
                LeaveReview
              </div>
            </div>
          </div>

          <div className="py-3 flex flex-col gap-4 ">
            <span className="text-xl font-bold">Description</span>
            <span>{shoe.description}</span>
          </div>

          <div className="py-3 flex gap-4">
            <span className="text-xl font-bold">Size: {shoe.size}</span>
          </div>

          <div className="py-3 flex gap-4">
            <span className="text-xl font-bold">Quantity</span>
            <span className="px-2 h-10 flex gap-4 items-center justify-center text-xl rounded-2xl bg-stone-300">
              <i
                className="bx bx-plus bx-sm"
                onClick={() => {
                  if (shoe && quantity < shoe.stock_quantity) {
                    setQuantity((prev) => prev + 1);
                  } else if (!shoe) {
                    alert("Shoe data is not available.");
                  } else {
                    alert("Not enough stock available!");
                  }
                }}
              />
              {quantity}
              <i
                className="bx bx-minus bx-sm"
                onClick={() => {
                  if (quantity <= 0) return;
                  setQuantity((prev) => prev - 1);
                }}
              />
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex flex-col gap-2 ">
              <span>Total Prices</span>
              <span className="text-xl font-bold">$ {shoe.price}</span>
            </div>
            <div
              className="h-16 w-1/2 flex items-center justify-center gap-4 bg-black text-white font-bold rounded-2xl cursor-pointer"
              onClick={addShoeToCart}
            >
              <i className="bx bx-cart bx-sm" />
              Add to Cart
            </div>
          </div>
        </div>
      </div>
      {loadingReviewList && (
        <ReviewListComponent
          shoeId={shoeId}
          setLoading={setLoadingReviewList}
        />
      )}
      {loadingLeaveReview && (
        <div className="fixed inset-0 flex flex-col w-full bg-black bg-opacity-50">
          <div className="h-2/3" />
          <LeaveReviewComponent
            customer_id={customer_id}
            shoeId={shoeId}
            setBoolean={setLoadingLeaveReview}
          />
        </div>
      )}
    </>
  );
}
