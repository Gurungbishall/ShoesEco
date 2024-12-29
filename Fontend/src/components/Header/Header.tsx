import Search from "./Search";
import CartBtn from "../Cart/CartBtn";
import NotificationBtn from "../Notification/NotificationBtn";
import { useNavigate } from "react-router-dom";
export default function Header() {
  let customer_Name = sessionStorage.getItem("customer_name");
  customer_Name = customer_Name ? customer_Name : "Enter the Name";

  const navigate = useNavigate();

  const toggleYourProfile = () => {
    navigate("/editprofile");
  };

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span
          className="text-2xl font-bold cursor-pointer"
          onClick={toggleYourProfile}
        >
          {customer_Name}
        </span>
        <div className="flex gap-2">
          <CartBtn />
          <NotificationBtn />
        </div>
      </div>
      <Search />
    </div>
  );
}
