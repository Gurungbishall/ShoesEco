import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import adidas from "../../pictures/AdidasResponseCLCrystalWhite.png";
import { SearchContext } from "../../pages/Home";
type Shoe = {
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

export default function Bottombody() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [brand_name, setBrand_name] = useState<string>("All");

  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "SearchContext is not available. Make sure you're using it within the SearchContext.Provider."
    );
  }
  const { searchfocus } = context;

  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate("/mostpopular");
  };

  const onClick = (name: string) => {
    setBrand_name(name);
  };

  const handleShoeClick = (shoeId: number) => {
    navigate("/shoe", {
      state: { shoeId },
    });
  };

  function Button({
    name,
    onClick,
  }: {
    name: string;
    onClick: (name: string) => void;
  }) {
    return (
      <button
        onClick={() => onClick(name)}
        className={`px-2 font-bold text-center border-2 border-black rounded-xl ${
          name === brand_name ? "bg-black text-white" : ""
        }`}
      >
        {name}
      </button>
    );
  }

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        let url = "http://localhost:3000/shoes/showshoes";

        if (brand_name && brand_name !== "All") {
          url += `?brand_name=${brand_name}`;
        }

        const res = await axios.get(url);
        setShoes(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoes();
  }, [brand_name]);

  return (
    <>
     {!searchfocus?(
       <div className="flex flex-col gap-2">
       <div className="flex justify-between font-bold">
         <span className="text-xl">Most Popular</span>
         <span className="cursor-pointer" onClick={handleSeeAll}>
           See all
         </span>
       </div>
       <div className="flex gap-2 overflow-x-auto">
         <Button name="All" onClick={onClick} />
         <Button name="Nike" onClick={onClick} />
         <Button name="Adidas" onClick={onClick} />
         <Button name="Puma" onClick={onClick} />
         <Button name="Reebok" onClick={onClick} />
         <Button name="New Balance" onClick={onClick} />
       </div>
       <div className="grid grid-cols-2 gap-3">
         {shoes.map((shoe) => (
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
     </div>
     ):null}
    </>
  );
}
