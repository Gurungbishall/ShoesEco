import { useNavigate } from "react-router-dom";
import AdidasResponseCrytalWhite from "../../pictures/AdidasResponseCLCrystalWhite.png";

export default function SpecialOffers() {
  const navigate = useNavigate();

  const toggleHome = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-arrow-left fa-2x cursor-pointer" onClick={toggleHome} />
            <span className="text-xl font-bold">Special Offers</span>
          </div>
          <i className="bx bx-dots-horizontal-rounded p-1 border-2 border-black rounded-full" />
        </div>
        <div className="bg-stone-400 h-52 rounded-2xl mb-4 relative">
          <div className="flex justify-between items-center h-full">
            <div className="pl-4">
              <p className="text-4xl font-bold">25%</p>
              <p className="text-lg font-semibold">Today's Special!</p>
              <p className="text-sm">
                Get discount for every order, only valid for today
              </p>
            </div>

            <img
              src={AdidasResponseCrytalWhite}
              alt="Adidas Shoe"
              className="h-full "
            />
          </div>
        </div>
        <div className="bg-stone-400 h-52 rounded-2xl mb-4 relative">
          <div className="flex justify-between items-center h-full">
            <div className="pl-4">
              <p className="text-4xl font-bold">25%</p>
              <p className="text-lg font-semibold">Today's Special!</p>
              <p className="text-sm">
                Get discount for every order, only valid for today
              </p>
            </div>

            <img
              src={AdidasResponseCrytalWhite}
              alt="Adidas Shoe"
              className="h-full "
            />
          </div>
        </div>
        <div className="bg-stone-400 h-52 rounded-lg mb-4 relative">
          <div className="flex justify-between items-center h-full">
            <div className="pl-4">
              <p className="text-4xl font-bold">25%</p>
              <p className="text-lg font-semibold">Today's Special!</p>
              <p className="text-sm">
                Get discount for every order, only valid for today
              </p>
            </div>

            <img
              src={AdidasResponseCrytalWhite}
              alt="Adidas Shoe"
              className="h-full "
            />
          </div>
        </div>
      </div>
    </>
  );
}
