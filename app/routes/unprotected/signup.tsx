import type { ActionFunction } from "react-router";
import { signup, User } from "../../services/auth.server";
import { useActionData } from "react-router";


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("formData", formData);
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid form submission" }),
      { status: 400 }
    );
  }

  const result = await signup({ email, password, username });
  console.log("result", result);
  return result;
};

export default function SignupRoute() {
  const actionData = useActionData<{ user?: User; error?: string }>();
  console.log("actionData", actionData);
  if (actionData?.user) {
    return (
      <div className="text-green-500 text-center p-4">
        Account created successfully! Redirecting...
      </div>
    );
  }

  return (
    <div className="text-red-500 text-center p-4">
      {actionData?.error}
    </div>
  );
}