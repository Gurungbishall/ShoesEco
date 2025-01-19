import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import adidas from "../../pictures/AdidasResponseCLCrystalWhite.png";

type Shoe = {
  shoe_id: number;
  brand_id: number;
  model_name: string;
  color: string;
  description: string;
  price: string;
  size: string;
  stock_quantity: number;
  rating: number;
};

export default function Shoe() {
  const location = useLocation();
  const shoeId = location.state?.shoeId;
  const previousRoute = location.state?.from;
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState(1);

  const customer_id = sessionStorage.getItem("customer_id");

  const navigate = useNavigate();

  const toggleHome = () => {
    navigate(previousRoute);
  };

  const increaseQuantity = () => {
    if (shoe && quantity < shoe.stock_quantity) {
      setQuantity((prev) => prev + 1);
    } else if (!shoe) {
      alert("Shoe data is not available.");
    } else {
      alert("Not enough stock available!");
    }
  };

  const decreaseQuantity = () => {
    if (quantity <= 0) return;
    setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    if (!shoeId) return;

    axios
      .get(`http://localhost:3000/shoes/shoe?shoe_id=${shoeId}`)
      .then((response) => {
        setShoe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shoe data:", error);
        setLoading(false);
      });
  }, [shoeId]);

  if (loading) return <div>Loading...</div>;

  if (!shoe) return <div>No shoe found</div>;

  const addShoeToCart = async () => {
    try {
      const response = await axios.post("http://localhost:3000/shoes/addshoe", {
        customer_id: customer_id,
        shoe_id: shoeId,
        quantity: quantity,
      });

      console.log("Response:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding shoe to cart:", error);
      alert("Failed to add shoe to cart.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <i
        className="absolute pl-2 pt-3 fa-solid fa-arrow-left fa-1x cursor-pointer"
        onClick={toggleHome}
      />
      <img src={adidas} alt="shoe" className="bg-slate-300" />
      <div className="px-4 flex flex-col ">
        <div className="py-3 flex flex-col gap-4 border-b-2">
          <span className="text-3xl font-bold">{shoe.model_name}</span>
          <span>
            <i className="bx bxs-star-half" /> {shoe.rating}
          </span>
        </div>

        <div className="py-3 flex flex-col gap-4 ">
          <span className="text-xl font-bold">Description</span>
          <span>{shoe.description}</span>
        </div>

        <div className="py-3 flex gap-4">
          <span className="text-xl font-bold">Size: {shoe.size}</span>
        </div>

        <div className="py-3 flex gap-4">
          <span className="text-xl font-bold">Quantity</span>
          <span className="px-2 h-10 flex gap-4 items-center justify-center text-xl rounded-2xl bg-stone-300">
            <i className="bx bx-plus bx-sm" onClick={increaseQuantity} />
            {quantity}
            <i className="bx bx-minus bx-sm" onClick={decreaseQuantity} />
          </span>
        </div>

        <div className="py-3 flex items-center justify-between">
          <div className="flex flex-col gap-2 ">
            <span>Total Prices</span>
            <span className="text-xl font-bold">$ {shoe.price}</span>
          </div>
          <div
            className="h-16 w-1/2 flex items-center justify-center gap-4 bg-black text-white font-bold rounded-2xl cursor-pointer"
            onClick={addShoeToCart}
          >
            <i className="bx bx-cart bx-sm" />
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
