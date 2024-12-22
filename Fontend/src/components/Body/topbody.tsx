import { useNavigate } from "react-router-dom";
import image from "../../pictures/AdidasResponseCLCrystalWhite.png";
import BrandLogoList from "../BrandLogoList/Brandlogolist";

export default function TopBody() {
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate("/specialOffers");
  };
  return (
    <>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex justify-between font-bold">
          <span className="text-xl">Special Offers</span>
          <span onClick={handleSeeAll}>See all</span>
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

            <img src={image} alt="Adidas Shoe" className="h-full " />
          </div>
        </div>
        <BrandLogoList />
      </div>
    </>
  );
}
