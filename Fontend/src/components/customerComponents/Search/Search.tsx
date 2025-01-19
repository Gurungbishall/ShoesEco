import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import adidas from "../../pictures/AdidasResponseCLCrystalWhite.png";
import { SearchContext } from "../../../pages/customerPages/Home";

type searchShoe = {
  shoe_id: number;
  brand_id: number;
  model_name: string;
  color: string;
  created_at: string;
  description: string;
  price: string;
  size: string;
  stock_quantity: number;
  rating: number;
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<searchShoe[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const navigate = useNavigate();
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "SearchContext is not available. Make sure you're using it within the SearchContext.Provider."
    );
  }
  const { setSearchFocus } = context;

  const handleShoeClick = (shoeId: number) => {
    navigate("/shoe", {
      state: { shoeId },
    });
  };

  const handleFocus = () => {
    setSearchFocus(true);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSearchFocus(false);
  };

  useEffect(() => {
    if (searchQuery === "") return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/shoes/searchshoes?model_name=${searchQuery}`
        );

        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="w-full relative flex items-center font-serif">
          <i className="bx bx-search bx-sm absolute pl-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            className="w-full pl-9 py-2 text-lg border-2 rounded-xl outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <i className="bx bx-slider-alt bx-sm absolute right-0 pr-2"></i>
        </div>

        {isFocused && (
          <div className="flex justify-between">
            <span>Result Search for {searchQuery}</span>
            <span
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="cursor-pointer"
            >
              Clear
            </span>
          </div>
        )}
      </div>

      {searchQuery && searchResults.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {searchResults.map((shoe) => (
            <div
              className="flex flex-col gap-2 cursor-pointer"
              key={shoe.shoe_id}
              onClick={() => handleShoeClick(shoe.shoe_id)}
            >
              <img
                src={adidas}
                alt="Adidas Shoe"
                className="bg-stone-300 rounded-xl"
              />
              <span className="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                {shoe.model_name}
              </span>
              <div className="flex justify-between font-bold">
                <span>
                  <i className="bx bxs-star-half" /> {shoe.rating}
                </span>
                <span>$ {shoe.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
