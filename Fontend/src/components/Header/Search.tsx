export default function Search() {
  return (
    <>
      <div className="w-full relative flex items-center font-serif">
        <i className="bx bx-search bx-sm absolute pl-2" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-9 py-2 text-lg border-2 rounded-xl outline-none"
        />
        <i className="bx bx-slider-alt bx-sm absolute right-0 pr-2"></i>
      </div>
    </>
  );
}
