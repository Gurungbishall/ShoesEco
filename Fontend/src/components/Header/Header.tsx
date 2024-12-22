import Search from "./Search";
import CartBtn from "../Cart/CartBtn";
import NotificationBtn from "../Notification/NotificationBtn";

export default function Header() {
  return (
    <>
        <div className="p-3 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">Big shoes</span>
            <div className="flex gap-2">
              <CartBtn />
              <NotificationBtn />
            </div>
          </div>
          <Search />
        </div>
     
    </>
  );
}
