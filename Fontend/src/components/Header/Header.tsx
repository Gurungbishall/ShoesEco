import Search from "./Search";
import NotificationBtn from "../Notification/NotificationBtn";
export default function Header() {
  let customer_Name = sessionStorage.getItem("customer_name");
  customer_Name = customer_Name ? customer_Name : "Enter the Name";

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold cursor-pointer">
          {customer_Name}
        </span>
        <div className="flex gap-2">
          <NotificationBtn />
        </div>
      </div>
      <Search />
    </div>
  );
}
