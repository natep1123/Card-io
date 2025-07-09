import { auth } from "@/auth";
import Profile from "@/components/Profile";

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

  return <Profile name={name} email={email} />;
}
