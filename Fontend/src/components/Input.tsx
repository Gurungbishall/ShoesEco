import React from "react";

type InputProps = {
  type: "text" | "password" | "email";
  id: string;
  placeholder: string;
  className?: string;

};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, placeholder, className = "", ...rest }: InputProps, ref) => {
    return (
      <input
        ref={ref} // Ensure ref is passed to the underlying input element
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
