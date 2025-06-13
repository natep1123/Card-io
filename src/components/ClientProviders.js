"use client";
import { SessionProvider } from "next-auth/react";
import { WorkoutProvider } from "@/contexts/WorkoutContext";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <WorkoutProvider>{children}</WorkoutProvider>
    </SessionProvider>
  );
}
