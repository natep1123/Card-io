import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  // Auth check; redirect logged-in users to home
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <main className="p-4">
      <LoginForm />
    </main>
  );
}
