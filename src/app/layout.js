import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import ClientProviders from "@/components/ClientProviders";
import { auth } from "@/auth";
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

export default async function RootLayout({ children }) {
  const session = await auth();
  const initialSession = !!session;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <div className="flex flex-col min-h-screen">
            <Header isSession={initialSession} />
            <main className="p-4 h-full flex flex-col items-center">
              {children}
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
