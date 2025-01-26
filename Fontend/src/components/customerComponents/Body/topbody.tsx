import { useNavigate } from "react-router-dom";
import image from "../../../pictures/AdidasResponseCLCrystalWhite.png";
import BrandLogoList from "../BrandLogoList/Brandlogolist";
import { useContext } from "react";
import { SearchContext } from "../../../pages/customerPages/Home";
export default function TopBody() {
  const navigate = useNavigate();

  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "SearchContext is not available. Make sure you're using it within the SearchContext.Provider."
    );
  }
  const { searchfocus } = context;

  const handleSeeAll = () => {
    navigate("/specialOffers");
  };
  return (
    <>
      {!searchfocus ? (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-bold">
            <span className="text-xl">Special Offers</span>
            <span onClick={handleSeeAll} className="cursor-pointer">
              See all
            </span>
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
      ) : null}
    </>
  );
}
