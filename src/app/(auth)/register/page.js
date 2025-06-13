import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage() {
  // Auth check; redirect logged-in users to home
  const session = await auth();
  if (session) {
    redirect("/home");
  }

  return (
    <main className="p-4">
      <RegisterForm />
    </main>
  );
}
