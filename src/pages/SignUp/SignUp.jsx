import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();

  const handlePasswordChange = (value) => {
    setPassword(value);

    setPasswordRules({
      length: value.length >= 8,
      upperCase: /[A-Z]/.test(value),
      lowerCase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[@$!%*?&/]/.test(value),
    });
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  // * CREATE ACCOUNT
  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name) {
      setError("Please enter your name");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email,
        password,
      });

      if (response.data.message === "User already exist") {
        setError("User already exist with this email.");
        setIsLoading(false);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />

            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <PasswordInput
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />

            {!isPasswordValid && (
              <ul className="text-sm mt-2">
                <li
                  className={`${
                    passwordRules.length ? "text-green-500" : "text-red-500"
                  }`}
                >
                  At least 8 characters
                </li>

                <li
                  className={`${
                    passwordRules.upperCase ? "text-green-500" : "text-red-500"
                  }`}
                >
                  At least one uppercase letter
                </li>

                <li
                  className={`${
                    passwordRules.lowerCase ? "text-green-500" : "text-red-500"
                  }`}
                >
                  At least one lowercase letter
                </li>

                <li
                  className={`${
                    passwordRules.number ? "text-green-500" : "text-red-500"
                  }`}
                >
                  At least one number
                </li>

                <li
                  className={`${
                    passwordRules.specialChar
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  At least one special character (@, $, !, %, *, ?, &)
                </li>
              </ul>
            )}

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
