import { auth } from "@/auth";
import Link from "next/link";
import ProfileActions from "@/components/ProfileActions";

export default async function ProfilePage() {
  // Auth check
  const session = await auth();
  const email = session ? session.user.email : null;
  const name = email ? email.split("@")[0] : null;

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
      <p className="text-lg text-gray mb-6">
        Welcome, <span className="font-bold">{name}</span>!
      </p>
      <p className="text-lg text-gray mb-6">
        Your registered email is: <span className="font-bold">{email}</span>
      </p>
      <Link
        href="/profile/analytics"
        className="px-4 py-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
      >
        Check Analytics
      </Link>
    </div>
  );
}
