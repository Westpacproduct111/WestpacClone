import bcrypt from "bcrypt";
import { db } from "../db/index";
import { users, admins, type User, type Admin } from "@shared/schema";
import { eq } from "drizzle-orm";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  return isValid ? user : null;
}

export async function authenticateAdmin(email: string, password: string): Promise<Admin | null> {
  const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  
  if (!admin) {
    return null;
  }

  const isValid = await verifyPassword(password, admin.password);
  return isValid ? admin : null;
}
