import { createUser, getUserByEmail } from "@/lib/userService";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    if (await getUserByEmail(email)) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }
    console.log("getUserByEmail:", getUserByEmail);
    // Create a new user
    const user = await createUser(name, email, password);
    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}