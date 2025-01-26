import adidas from "../../../pictures/AdidasResponseCLCrystalWhite.png";

type CartItem = {
  cart_item_id: number;
  color: string;
  description: string;
  model_name: string;
  price: string;
  quantity: number;
  shoe_id: number;
  size: string;
};

export default function DeleteItem({
  deleteCartItem,
  shoe,
  closeMenu,
}: {
  deleteCartItem: (id: number) => void;
  shoe: CartItem;
  closeMenu: () => void;
}) {
  return (
    <div className="w-full h-1/2 px-7 flex flex-col gap-4 justify-center bg-white rounded-t-[70px]">
      <div className="text-3xl font-bold text-center">Remove From Cart?</div>
      <div className="flex border-y-2 py-5 ">
        <img
          src={adidas}
          alt="adidas"
          className="size-32 bg-slate-200 rounded-lg"
        />

        <div className="w-full p-2 flex flex-col gap-3">
          <div className="flex text-xl font-bold">
            <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]">
              {shoe.model_name}
            </span>
          </div>
          <div className="flex gap-2 text-zinc-600">
            <span>Color = {shoe.color}</span>|<span>Size = {shoe.size}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${shoe.price}</span>
            <span className="size-10 flex items-center justify-center rounded-full bg-stone-300">
              {shoe.quantity}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <div
          className="py-2 w-1/2 text-center text-xl font-bold cursor-pointer rounded-xl bg-slate-300"
          onClick={closeMenu}
        >
          Cancel
        </div>
        <div
          className="py-2 w-1/2 text-center text-xl text-white font-bold cursor-pointer rounded-xl bg-black"
          onClick={() => deleteCartItem(shoe.cart_item_id)}
        >
          Yes, Remove
        </div>
      </div>
    </div>
  );
}
