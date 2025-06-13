import { auth } from "@/auth";
import Link from "next/link";

export default async function ProfilePage() {
  // Auth check
  const session = await auth();
  if (!session) {
    return (
      <div className="min-h-screen bg-slate text-white flex flex-col items-center px-4">
        <h2 className="text-4xl font-bold mb-4">
          Only Users Can View Profiles.
        </h2>
        <p className="text-lg text-gray mb-6">
          Please log in and/or register an account to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center max-w-2xl">
      <h2>Profile Page</h2>
    </div>
  );
}
