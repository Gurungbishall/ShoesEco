import { useNavigate } from "react-router-dom";
import AdidasResponseCrytalWhite from "../../pictures/AdidasResponseCLCrystalWhite.png";

export default function Mostpopular() {
  const navigate = useNavigate();

  const toggleHome = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i
              className="fa-solid fa-arrow-left fa-2x cursor-pointer"
              onClick={toggleHome}
            />
            <span className="text-xl font-bold">Most Popular</span>
          </div>
          <i className="bx bx-search bx-sm " />
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
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <img
              src={AdidasResponseCrytalWhite}
              alt="Adidas Shoe"
              className="bg-stone-500 rounded-xl"
            />
            <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              Adidas Response Crystal White
            </span>
            <span className="text-xl font-bold">$ 100.00</span>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src={AdidasResponseCrytalWhite}
              alt="Adidas Shoe"
              className="bg-stone-500 rounded-xl"
            />
            <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              Adidas Response Crystal White
            </span>
            <span className="text-xl font-bold">$ 100.00</span>
          </div>
        </div>
      </div>
    </>
  );
}
