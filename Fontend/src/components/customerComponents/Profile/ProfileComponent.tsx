import { useNavigate } from "react-router-dom";
export default function ProfileComponent() {
  const navigate = useNavigate();
  const customer_Name = sessionStorage.getItem("customer_name");

  return (
    <>
      <div className="w-screen p-4 flex flex-col gap-4 ">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Profile</span>
          <i className="bx bx-dots-horizontal-rounded p-1 border-2 border-black rounded-full" />
        </div>
        <div className="text-center text-xl font-bold">{customer_Name}</div>
        <div className="flex flex-col gap-1 text-lg font-normal">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            <div className="flex gap-3 items-center">
              <i className="bx bx-user" />
              Edit Profile
            </div>
            <i className="bx bxs-chevron-right" />
          </div>

          <div
            className="flex justify-between text-red-500 cursor-pointer"
            onClick={() => {
              sessionStorage.clear();
              navigate("/")
            }}
          >
            <div className="flex gap-3 items-center">
              <i className="bx bx-exit" />
              Log Out
            </div>
            <i className="bx bxs-chevron-right" />
          </div>
        </div>
      </div>
    </>
  );
}
