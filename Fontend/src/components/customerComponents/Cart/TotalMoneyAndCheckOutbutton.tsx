import { useNavigate } from "react-router-dom";

export default function TotalMoneyAndCheckOutbutton({
  TotalPrice,
}: {
  TotalPrice: number;
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed bottom-20 left-0 w-full bg-white p-4 flex justify-between border-t-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs">Total Price</span>
          <span className="text-3xl font-bold">Rs {TotalPrice}</span>
        </div>
        <div
          onClick={() => {
            navigate("/checkout");
          }}
          className="py-2 w-3/5 flex items-center justify-center gap-2 text-xl text-white font-bold cursor-pointer rounded-full bg-black"
        >
          Checkout
          <i className="bx bx-right-arrow-alt"></i>
        </div>
      </div>
    </>
  );
}
