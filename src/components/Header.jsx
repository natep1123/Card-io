"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useWorkoutContext } from "@/contexts/WorkoutContext";

export default function Header({ isSession: initialSession }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSession, setIsSession] = useState(initialSession); // Initialize with server value
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { resetWorkout } = useWorkoutContext();

  const pages = [
    { name: "Home", path: "/" },
    { name: "Workout", path: "/workout" },
    { name: "Profile", path: "/profile" },
    { name: "About", path: "/about" },
  ];

  // Sync client-side session state after hydration
  useEffect(() => {
    if (status !== "loading") {
      setIsSession(!!session); // Update isSession once session is resolved
    }
  }, [status, session]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignout = () => {
    // Confirm sign out
    const confirmSignout = window.confirm(
      "Are you sure you want to log out? Unsaved workout stats will be lost."
    );
    if (!confirmSignout) return;
    signOut({ callbackUrl: "/" });
    setIsOpen(false);
    resetWorkout(); // Reset workout states on sign out
  };

  return (
    <header className="bg-black border-b border-white sticky top-0 z-10 p-4">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-3">
            <img
              src="Card-io-Logo.png"
              alt="Card-io Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-17 md:w-17 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Card-io
              </h1>
              <p className="text-sm sm:text-base italic text-gray-500">
                The deck of cards workout challenge!
              </p>
            </div>
          </div>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
          <span className="w-6 h-1 bg-white"></span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.path}
              className={`text-md font-semibold ${
                pathname === page.path ? "text-red" : "text-white"
              }`}
            >
              {page.name}
            </Link>
          ))}
          {isSession ? (
            <button
              onClick={handleSignout}
              className="text-md font-semibold text-white cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`text-md font-semibold ${
                pathname === "/login" ? "text-red" : "text-white"
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav className="md:hidden bg-black absolute top-full left-0 w-full z-10 border-b border-white">
          <div className="flex flex-col gap-2 px-4 py-4">
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.path}
                onClick={() => setIsOpen(false)}
                className={`text-md font-semibold ${
                  pathname === page.path ? "text-red" : "text-white"
                }`}
              >
                {page.name}
              </Link>
            ))}
            {isSession ? (
              <button
                onClick={handleSignout}
                className="text-md font-semibold text-white text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className={`text-md font-semibold ${
                  pathname === "/login" ? "text-red" : "text-white"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
