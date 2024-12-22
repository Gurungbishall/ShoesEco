import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Label from "../Label";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setLoading(true);

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
    navigate('/signup');
  };

  return (
    <>
      <div className="xl:w-1/4 p-3 flex flex-col gap-3 rounded-lg border-2 shadow-lg">
        <span className="text-2xl font-bold text-center">Sign In</span>
        <Label Name="Email Address" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-between">
          <Label Name="Password" />
          <a href="/" className="text-blue-500">
            Forget Password?
          </a>
        </div>
        <div className="relative flex justify-end items-center">
          <Input
            type={visibility ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fa-regular ${
              visibility ? "fa-eye-slash" : "fa-eye"
            } fa-xl absolute pr-3`}
            onClick={toggleVisibility}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <Button state={loading} onClick={handleSubmit}>
            {loading ? "Loading..." : "SIGN IN"}
          </Button>
        </div>
        <button
          className="text-center font-bold hover:text-blue-600 transition duration-1000 delay-75"
          onClick={toggleToSignupPage}
        >
          Register Now
        </button>
      </div>
    </>
  );
}
