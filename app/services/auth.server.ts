import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { UserModel } from "./user.server";
import bcrypt from "bcryptjs";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "s3cr3t"], // Change in production
    secure: process.env.NODE_ENV === "production",
  },
});

export interface LoginForm {
  email: string;
  password: string;
}

export class AuthService {
  static async login({ email, password }: LoginForm) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    const session = await sessionStorage.getSession();
    session.set("userId", user.id);

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    };
  }

  static async logout(request: Request) {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    return redirect("/login", {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  }

  static async requireUser(request: Request) {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");

    if (!userId) {
      throw redirect("/login");
    }

    const user = await UserModel.findByEmail(userId);
    if (!user) {
      throw redirect("/login");
    }

    return user;
  }

  static async signup({ email, password, username }: {
    email: string;
    password: string;
    username: string;
  }) {
    // Check if user exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      name: username,
    });

    console.log("user", user);
    const session = await sessionStorage.getSession();
    session.set("userId", user.id);

    console.log("session", session);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    };
  }
}
