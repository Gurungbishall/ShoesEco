import { ReactNode } from "react";

export default function Button({
  state,
  onClick,
  children,
}: {
  state: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className={`w-full p-3 ${
        state ? "bg-green-600" : "bg-orange-400"
      } text-white font-bold rounded-2xl hover:bg-blue-600 transition duration-1000 delay-75`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
