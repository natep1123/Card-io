"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/index";
import Loader from "./Loader";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Input validation
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    // API Call
    try {
      let response = await registerUser(trimmedEmail, trimmedPassword);

      if (response.status === 201) {
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        setError(response.data?.message || "Registration failed.");
        setLoading(false);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate min-h-screen">
      {loading && <Loader isLoading={loading} />}
      {!loading && (
        <>
          <h2 className="mb-6 text-white text-2xl font-semibold">Register</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-black border border-white w-full max-w-sm shadow-lg shadow-green-400/40"
          >
            <div className="flex flex-col items-center gap-2 w-full">
              <label htmlFor="email" className="text-white font-semibold">
                Email:
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-md bg-slate text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <label htmlFor="password" className="text-white font-semibold">
                Password:
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 rounded-md bg-slate text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gray-700 text-white font-semibold cursor-pointer hover:bg-gray-600 transition"
              disabled={loading}
            >
              Register
            </button>
            {error && (
              <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 w-fit mx-auto text-center">
                {error}
              </div>
            )}
            <span className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-white underline">
                Login
              </Link>
            </span>
          </form>
        </>
      )}
    </div>
  );
}
