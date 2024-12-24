import { useNavigate } from "react-router-dom";

export default function Bottombody() {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/mostpopular");
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-bold">
          <span className="text-xl">Most Popular</span>
          <span className="cursor-pointer" onClick={handleSeeAll}>
            See all
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            All
          </div>
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            Nike
          </div>
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            Adidas
          </div>
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            Nike
          </div>
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            Adidas
          </div>
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            Nike
          </div>
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            Adidas
          </div>
          <div className="p-2 font-bold text-center border-2 border-black rounded-2xl">
            Nike
          </div>
        </div>
      </div>
    </>
  );
}
