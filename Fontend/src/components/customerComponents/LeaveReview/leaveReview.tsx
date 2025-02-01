import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function LeaveReviewComponent({
  customer_id,
  shoeId,
  setBoolean,
}: {
  customer_id: string | null;
  shoeId: string;
  setBoolean: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [rating, setRating] = useState(0);
  const [review, setreview] = useState<string>("");

  const addReview = async () => {
    const accessToken = Cookies.get("accessToken");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/review",
        {
          customer_id: customer_id,
          shoe_id: shoeId,
          rating: rating,
          review_text: review,
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
      console.error("Error adding or updating review:", error);
      alert("Failed to add review.");
    }
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="w-full h-2/6 p-6 flex flex-col gap-4 bg-white rounded-t-3xl">
      <div className="text-3xl pb-4 font-bold text-center border-b-2">
        Leave a review
      </div>

      <div className="flex justify-center gap-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`cursor-pointer text-6xl ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleStarClick(index)}
          >
            ★
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Review"
          onChange={(e) => setreview(e.target.value)}
          className="p-2 w-full text-lg bg-gray-100 border-black border-2 rounded-2xl"
        />
      </div>

      <div className="flex gap-2 justify-between">
        <div
          className="py-2 w-1/2 text-center text-xl font-bold cursor-pointer rounded-xl bg-slate-300"
          onClick={() => {
            setBoolean(false);
          }}
        >
          Cancel
        </div>
        <div
          className="py-2 w-1/2 text-center text-xl text-white font-bold cursor-pointer rounded-xl bg-black"
          onClick={addReview}
        >
          Submit
        </div>
      </div>
    </div>
  );
}
