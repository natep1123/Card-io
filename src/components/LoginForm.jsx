"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function LoginForm() {
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
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    // API call
    const result = await signIn("credentials", {
      email: trimmedEmail,
      password: trimmedPassword,
      redirect: false,
    });

    // Handle response
    if (result?.error) {
      setError("Incorrect email or password.");
      setLoading(false);
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate min-h-screen">
      {loading && <Loader isLoading={loading} />}
      {!loading && (
        <>
          <h2 className="mb-6 text-white text-2xl font-semibold">Login</h2>
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
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 w-fit mx-auto text-center">
                {error}
              </div>
            )}
            <span className="text-center text-gray text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline text-white">
                Register
              </Link>
            </span>
          </form>
        </>
      )}
    </div>
  );
}
