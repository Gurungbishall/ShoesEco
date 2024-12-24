import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Input from "../Input";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState<boolean>(true);
  const [confirmPasswordvisibility, setConfirmPasswordVisibility] =
    useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordvisibility);
  };

  const onSubmit = async (data: SignUpFormData) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        navigate("/signin");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to sign up. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-screen h-screen px-4 flex flex-col gap-3 justify-center">
      <span className="text-2xl font-bold text-center">
        Create Your Account
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-4 "
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <div className="relative flex items-center">
              <i className="bx bxs-lock-alt absolute left-1" />
              <Input type="email" {...field} placeholder="Your Email" />
            </div>
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field }) => (
            <div className="relative flex items-center">
              <i className="bx bxs-lock-alt absolute left-1" />

              <Input
                type={visibility ? "text" : "password"}
                {...field}
                placeholder="Password (at least 8 characters)"
              />

              <i
                className={`fa-regular ${
                  visibility ? "fa-eye-slash" : "fa-eye"
                }  absolute right-3`}
                onClick={toggleVisibility}
              />
            </div>
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm password is required",
          }}
          render={({ field }) => (
            <div className="relative flex items-center">
              <i className="bx bxs-lock-alt absolute left-1" />
              <Input
                type={confirmPasswordvisibility ? "text" : "password"}
                {...field}
                placeholder="Confirm Password"
              />
              <i
                className={`fa-regular ${
                  visibility ? "fa-eye-slash" : "fa-eye"
                }  absolute right-3`}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className="bg-black text-white p-3 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
