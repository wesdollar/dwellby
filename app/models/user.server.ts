import type { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

export async function verifyLogin(email: User["email"], password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password as string
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
