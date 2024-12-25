/* eslint-disable @typescript-eslint/no-unused-vars */
import { createCookieSessionStorage, redirect } from "react-router";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { UserModel } from "./user.server";
import { sessionStorage } from "~/routes/_index";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// Define the flash session storage. Mostly used for error messages right now.
export const flashSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__flash",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});


// Define your User type to match your database model
export type User = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
};

class AuthError extends Error { }

// Create an instance of the authenticator
export const authenticator = new Authenticator<User>();

// Configure FormStrategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      throw new AuthError("Invalid form submission");
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new AuthError("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AuthError("Invalid credentials");
    }


    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }),
  "form"
);

export async function requireUser(request: Request): Promise<User> {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (!user) {
    throw redirect("/");
  }

  console.log("User", user);
  return user;
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function signup({ email, password, username }: {
  email: string;
  password: string;
  username: string;
}) {
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email,
    password: hashedPassword,
    name: username,
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getFlashMessage(request: Request) {
  const session = await flashSessionStorage.getSession(request.headers.get("Cookie"));
  const error = session.get("error");

  return {
    error,
    headers: {
      "Set-Cookie": await flashSessionStorage.commitSession(session),
    },
  };
}

export async function getAuthToken(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (!user) {
    throw Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Return the session cookie that GML can use
  return Response.json({
    token: request.headers.get("Cookie")
  }, {
    headers: {
      "Access-Control-Allow-Origin": "http://127.0.0.1:51264",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}

export function createGameToken(user: User | undefined) {
  const gameToken = {
    userId: user?.id || 'guest',
    email: user?.email,
    name: user?.name,
    // Add any other user data you need
  };

  return jwt.sign(
    gameToken,
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '15m' }
  );
}