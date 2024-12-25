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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Form submitted with data:", data);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/signin", data);
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error: any) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
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
          <Button state={loading} type="submit">
            {loading ? <i className="fa fa-spinner fa-spin mr-2"></i> : null}
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}
