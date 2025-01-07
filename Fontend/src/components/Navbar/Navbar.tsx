import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();

  const toggletoprofile = () => {
    navigate("/editprofile");
  };

  const toggleToHome = () => {
    navigate("/home");
  };

  const toggleToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-between">
      <div
        className="flex flex-col items-center justify-center"
        onClick={toggleToHome}
      >
        <i className="bx bxs-home bx-sm" />
        <span>Home</span>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={toggleToCart}
      >
        <i className="bx bxs-shopping-bag bx-sm" />
        <span>Cart</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <i className="bx bxs-cart bx-sm" />
        <span>Orders</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <i className="bx bxs-wallet bx-sm" />
        <span>Wallet</span>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={toggletoprofile}
      >
        <i className="bx bxs-user bx-sm" />
        <span>profile</span>
      </div>
    </div>
  );
}
