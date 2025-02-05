import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Example: Using Prisma ORM

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
}