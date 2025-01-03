import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import adidas from "../../pictures/AdidasResponseCLCrystalWhite.png";

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
};

export default function Bottombody() {
  const [shoes, setShoes] = useState<Shoe[]>([]); 

  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate("/mostpopular");
  };

  function Button({name}:{
    name:string;
  }) {
    return(
      <>
         <button className="px-2 font-bold text-center border-2 border-black rounded-xl">
          {name}
          </button>
      </>
    );
  }
    
  useEffect(() => {
    axios
    .get('http://localhost:3000/shoes/allShoes')
    .then((response) => {
      setShoes(response.data.data);
      console.log(response.data.data);
    }).catch((error) => {
      console.log(error)
    })
  },[])
  
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
          <Button  name="All"/> 
          <Button  name="Nike"/> 
          <Button  name="Adidas"/> 
          <Button  name="Puma"/> 
          <Button  name="Reebok"/> 
          <Button  name="New Balance"/> 
          <Button  name="All"/>
        </div>
         <div className="grid grid-cols-2 gap-3">
          {
            shoes.map((shoe) => (
              <div className="flex flex-col gap-2" key={shoe.shoe_id}>
              <img
                src={adidas}
                alt="Adidas Shoe"
                className="bg-stone-300 rounded-xl"
              />
              <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {shoe.model_name}
              </span>
              <div className="flex justify-between">
              <span className="text-xl font-bold">{shoe.price}</span>
              <span className="text-xl font-bold">Size:{shoe.size}</span>
              </div>
            </div>
            ))
          }
         </div>
      </div>
    </>
  );
}
