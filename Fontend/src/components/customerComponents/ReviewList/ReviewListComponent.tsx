import { useEffect, useState } from "react";
import Container from "../../Container";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const baseURL = import.meta.env.VITE_BACKEND_URL;

type review = {
  customer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
};

export default function ReviewListComponent({
  shoeId,
  setLoading,
}: {
  shoeId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [rating_number, setRating_number] = useState<string>("All");
  const [reviewList, setReviewList] = useState<review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!shoeId) {
    return <div>Error: Shoe ID is missing.</div>;
  }

  function Button({ name }: { name: string }) {
    return (
      <div
        onClick={() => {
          setRating_number(name);
        }}
        className={`p-2 flex items-center justify-center gap-1 font-bold border-2 border-black rounded-2xl cursor-pointer transition-colors duration-300 ${
          rating_number === name ? "bg-black text-white" : "bg-white"
        }`}
      >
        <span>★</span>
        <span>{name}</span>
      </div>
    );
  }

  useEffect(() => {
    const fetchReview = async () => {
      setIsLoading(true);
      try {
        let url = `${baseURL}/shoes/review-list?shoe_id=${shoeId}`;

        if (rating_number && rating_number !== "All") {
          url += `&rating_number=${rating_number}`;
        }

        const res = await axios.get(url);
        setReviewList(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [rating_number, shoeId]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-white overflow-y-auto">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <i
                className="fa-solid fa-arrow-left fa-2x cursor-pointer"
                onClick={() => {
                  setLoading(false);
                }}
              />
              <span className="text-xl font-bold">Reviews</span>
            </div>

            <div className="flex gap-2 overflow-x-auto py-3">
              <Button name="All" />
              <Button name="5" />
              <Button name="4" />
              <Button name="3" />
              <Button name="2" />
              <Button name="1" />
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <span>Loading reviews...</span>
              </div>
            ) : (
              <div className="review-list space-y-4">
                {reviewList.map((review, index) => (
                  <div
                    key={index}
                    className="p-3 flex flex-col gap-2 border-2 border-black rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">
                        {review.customer_name}
                      </span>
                      <span className="p-1 w-14 text-center text-sm border-2 border-black rounded-lg">
                        ★ {Math.round(review.rating)}
                      </span>
                    </div>
                    <div>
                      <span>{review.review_text}</span>
                    </div>
                    <div className="text-right">
                      {formatDistanceToNow(new Date(review.review_date), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
