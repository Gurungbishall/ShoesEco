import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Label from "../Label";

export default function SignUpComponent() {
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !address ||
      !phoneNumber
    ) {
      setError("All fields are required.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const passwordStrengthRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      setError(
        "Password must include uppercase, a number, and a special character."
      );
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Invalid phone number format.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          password,
          address,
          phoneNumber,
        }),
      });

      if (response.ok) {
        navigate("/signin");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to sign up. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  return (
    <>
      <div className="xl:w-1/4 p-3 flex flex-col gap-3 rounded-lg border-2 shadow-lg">
        <span className="text-2xl font-bold text-center">Sign Up</span>
        <Label Name="User Name" />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border-2 text-xl"
          placeholder="Your User Name"
        />
        <Label Name="Address" />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border-2 text-xl"
          placeholder="Your Address"
        />

        <Label Name="Phone Number" />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border-2 text-xl"
          placeholder="Your Phone Number"
        />

        <Label Name="Email Address" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border-2 text-xl"
          placeholder="Your Email"
        />
        <Label Name="Password" />
        <div className="relative flex justify-end items-center">
          <input
            type={passwordVisibility ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-2 text-xl"
            placeholder="8+ Characters"
          />
          <i
            className={`fa-regular ${
              passwordVisibility ? "fa-eye-slash" : "fa-eye"
            } fa-xl absolute pr-3`}
            onClick={togglePasswordVisibility}
          />
        </div>
        <Label Name="Confirm Password" />
        <div className="relative flex justify-end items-center">
          <input
            type={confirmPasswordVisibility ? "password" : "text"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border-2 text-xl"
          />
          <i
            className={`fa-regular ${
              confirmPasswordVisibility ? "fa-eye-slash" : "fa-eye"
            } fa-xl absolute pr-3`}
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <Button state={loading} onClick={handleSignUp}>
            {loading ? "Loading..." : "SIGN UP"}
          </Button>
        </div>
      </div>
    </>
  );
}
