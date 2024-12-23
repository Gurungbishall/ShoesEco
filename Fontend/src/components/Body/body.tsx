import Bottombody from "./bottombody";
import TopBody from "./topbody";
export default function Body() {
  return (
    <>
      <div className="w-screen p-3 flex flex-col gap-4 ">
        <TopBody />
        <Bottombody />
      </div>
    </>
  );
}
