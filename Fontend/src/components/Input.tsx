import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  placeholder: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, placeholder, className = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full pl-6 py-2 text-lg bg-gray-100 focus:outline-black focus:ring-2 focus:ring-black rounded-xl ${className}`}
        {...rest}
      />
    );
  }
);

export default Input;
