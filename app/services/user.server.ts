import { prisma } from "../db.server";
import type { Prisma } from "@prisma/client";

export class UserModel {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true, // Be careful with password exposure
        createdAt: true,
        // Excluding posts for basic user data
      }
    });
  }

  static async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        password: true, // Added to match findByEmail
        createdAt: true,
      }
    });
  }
}
