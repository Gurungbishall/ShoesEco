import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import axios from "axios";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginComponent() {
  const [error, setError] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const toggleToSignUp = () => {
    navigate("/signup");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        data
      );

      if (response.status === 200) {
        const customer_Name = response.data.name;
        const customer_ID = response.data.user_id;
        sessionStorage.setItem("customer_name", customer_Name);
        sessionStorage.setItem("customer_id", customer_ID);
        sessionStorage.setItem("is_admin", response.data.is_admin);
        navigate("/");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-screen h-screen px-4 flex flex-col gap-3 justify-center">
      <span className="text-2xl font-bold text-center">
        Log in to Your Account
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="relative flex items-center">
          <i className="bx bxs-envelope absolute left-1" />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
        </div>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <div className="relative flex items-center">
          <i className="bx bxs-lock-alt absolute left-1" />
          <Input
            id="password"
            placeholder="Password"
            type={visibility ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
          />
          <i
            className={`fa-regular ${
              visibility ? "fa-eye-slash" : "fa-eye"
            } absolute right-3`}
            onClick={toggleVisibility}
          />
        </div>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        {error && <div className="text-red-500">{error}</div>}

        <div>
          <Button state={isSubmitting} type="submit">
            {isSubmitting ? (
              <i className="fa fa-spinner fa-spin mr-2"></i>
            ) : null}
            {isSubmitting ? "Loading..." : "Sign in"}
          </Button>
        </div>
      </form>
      <div className="flex gap-3 justify-center">
        <span>Don't have an account?</span>
        <span className="font-bold" onClick={toggleToSignUp}>
          Sign up
        </span>
      </div>
    </div>
  );
}
