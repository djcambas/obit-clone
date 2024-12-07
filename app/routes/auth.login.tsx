import type { ActionFunction, TypedResponse } from "@remix-run/node";
import { AuthService } from "../services/auth.server";
import { useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  console.log("request", request);
  const formData = await request.formData();
  console.log("formData", formData);
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return new Response(JSON.stringify({ error: "Invalid form submission" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }) as TypedResponse;
  }

  const result = await AuthService.login({ email, password });
  return Response.json(result);
};

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();
  console.log("actionData", actionData);
  if (actionData?.user) {
    return (
      <div className="text-green-500 text-center p-4">
        Login successful! Redirecting...
      </div>
    );
  }

  return (
    <div className="text-red-500 text-center p-4">
      {actionData?.error}
    </div>
  );
}