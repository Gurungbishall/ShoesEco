import { useEffect, useState } from "react";
import Container from "../../Container";
import axios from "axios";

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
        className={`w-20 h-10 flex items-center justify-center gap-1 font-bold border-2 border-black rounded-3xl cursor-pointer transition-colors duration-300 ${
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
        let url = `http://localhost:3000/shoes/review-list?shoe_id=${shoeId}`;

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
          <div className="flex flex-col gap-4 p-4">
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
                    className="review-item border p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">
                        {review.customer_name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(review.review_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                      </span>
                      <span className="text-gray-700">{review.rating}</span>
                    </div>
                    <p className="mt-2 text-gray-800">{review.review_text}</p>
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
