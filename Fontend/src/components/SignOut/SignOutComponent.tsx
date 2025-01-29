import Cookies from "js-cookie";

export default function SignOutComponent() {
  const deleteInfo = () => {
    sessionStorage.clear;
    Cookies.remove("accessToken");
  };
  return (
    <>
      <div onClick={deleteInfo}>signOut</div>
    </>
  );
}
