//import RegisterForm from "../../../components/RegisterForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Auth check; redirect logged-in users to home
  const session = await auth();
  if (session) {
    redirect("/home");
  }

  return <main className="p-4">Login form</main>;
}
