import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdidasResponseCrytalWhite from "../../../pictures/AdidasResponseCLCrystalWhite.png";

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

export default function Mostpopular() {
  const [brand_name, setBrand_name] = useState<string>("All");
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.brand_name) {
      setBrand_name(location.state.brand_name);
    }
  }, [location.state?.brand_name]);

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

  function Button({ name }: { name: string }) {
    return (
      <button
        onClick={() => {
          setBrand_name(name);
        }}
        className={`px-2 font-bold text-center border-2 border-black rounded-xl ${
          brand_name === name ? "bg-black text-white" : ""
        }`}
      >
        {name}
      </button>
    );
  }

  return (
    <>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i
              className="fa-solid fa-arrow-left fa-2x cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <span className="text-xl font-bold">Most Popular</span>
          </div>
          <i className="bx bx-search bx-sm " />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <Button name="All" />
          <Button name="Nike" />
          <Button name="Adidas" />
          <Button name="Puma" />
          <Button name="Reebok" />
          <Button name="New Balance" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shoes.map((shoe) => (
            <div
              className="flex flex-col gap-2 cursor-pointer"
              key={shoe.shoe_id}
              onClick={() => {
                navigate("/shoe", {
                  state: { shoeId: shoe.shoe_id, from: location.pathname },
                });
              }}
            >
              <img
                src={AdidasResponseCrytalWhite}
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
    </>
  );
}
