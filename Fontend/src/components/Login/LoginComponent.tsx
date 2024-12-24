import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setError(result.message || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const toggleToSignupPage = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="w-screen h-screen px-4 flex flex-col gap-3  justify-center">
        <span className="text-2xl font-bold text-center">
          Login in Your Account
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="relative flex items-center">
            <i className="bx bxs-envelope absolute left-1" />
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          <div className="relative flex items-center">
            <i className="bx bxs-lock-alt absolute left-1" />

            <Input
              placeholder="Password"
              type={visibility ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
            />

            <i
              className={`fa-regular ${
                visibility ? "fa-eye-slash" : "fa-eye"
              }  absolute right-3`}
              onClick={toggleVisibility}
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <div>
            <Button state={loading} type="submit">
              {loading ? "Loading..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="flex flex-col justify-center items-center gap-4">
          <a href="/" className="text-blue-500">
            Forget Password?
          </a>
          <div>
            <span>Don't have an account? </span>
            <span className="font-bold" onClick={toggleToSignupPage}>
              Sign up
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
