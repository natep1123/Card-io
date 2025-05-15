"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Pathname for highlighting the active link
  const pathname = usePathname();
  const pages = [
    { name: "Home", path: "/" },
    { name: "Workout", path: "/workout" },
    { name: "About", path: "/about" },
  ];

  // Toggle function for the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <p className="text-sm sm:text-base italic text-gray">
                The card-based workout generator!
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
        <nav className="hidden md:flex gap-4">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={`${page.path}`}
              className={`text-md font-semibold ${
                pathname === `${page.path}` ? "text-red" : "text-white"
              }`}
            >
              {page.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav className="md:hidden bg-black absolute top-full left-0 w-full z-10 border-b border-white">
          <div className="flex flex-col gap-2 px-4 py-4">
            {pages.map((page) => (
              <Link
                key={page.name}
                href={`${page.path}`}
                onClick={() => setIsOpen(false)}
                className={`text-md font-semibold ${
                  pathname === `${page.path}` ? "text-red" : "text-white"
                }`}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
