import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Card-io",
  description: "Card-based workout generator using Deck of Cards API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WorkoutProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="p-4 h-full flex flex-col items-center">
              {children}
            </main>
          </div>
        </WorkoutProvider>
      </body>
    </html>
  );
}
