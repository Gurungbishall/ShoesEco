import { ReactNode } from "react";

export default function Button({
  state,
  children,
  type,
}: {
  state: boolean;
  children: ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];

}) {
  return (
    <button
      type={type}
      disabled ={state}
      className={`w-full p-3 ${
        state ? "bg-green-600" : "bg-black"
      } text-white text-base font-bold rounded-lg `}
    >
      {children}
    </button>
  );
}
