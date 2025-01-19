import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PendingOrderComponent from "./PendingOrderComponent";
import CompletedOrderComponent from "./CompletedOrderComponent";

export default function OrderComponent() {
  const [displayActive, setDisplayActive] = useState(true);
  const [displayCompleted, setDisplayCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleShoeClick = (shoeId: number) => {
    navigate("/shoe", {
      state: { shoeId, from: location.pathname },
    });
  };

  return (
    <>
      <div className="p-6 flex flex-col gap-3 ">
        <div>
          <span className="text-2xl font-bold">My Order</span>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            <span>{error}</span>
          </div>
        )}
        <div className="w-full mt-4 flex ">
          <span
            className={`w-1/2 pb-3 text-center text-xl font-bold border-b-4 ${
              displayActive ? " border-black" : null
            }`}
            onClick={() => {
              setDisplayActive(true);
              setDisplayCompleted(false);
            }}
          >
            Active
          </span>
          <span
            className={`w-1/2 pb-3 text-center text-xl font-bold border-b-4 ${
              displayCompleted ? " border-black" : null
            }`}
            onClick={() => {
              setDisplayActive(false);
              setDisplayCompleted(true);
            }}
          >
            Completed
          </span>
        </div>
        <div className="flex flex-col gap-3 pb-20">
          {displayActive ? (
            <PendingOrderComponent
              setError={setError}
              handleShoeClick={handleShoeClick}
            />
          ) : null}

          {displayCompleted ? (
            <CompletedOrderComponent
              setError={setError}
              handleShoeClick={handleShoeClick}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
