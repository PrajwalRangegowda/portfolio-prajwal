import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {

      redirect("/"); // Redirect to home if not logged in
    }
    console.log(session.user?.name?.split(" ")[0]);
  return <div>Protected Content, Welcome {session.user?.name}!</div>;
}