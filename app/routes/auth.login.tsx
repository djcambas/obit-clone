import { ActionFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { authenticator, flashSessionStorage } from "~/services/auth.server";
import { sessionStorage } from "~/routes/_index";
export const action: ActionFunction = async ({ request }) => {
  try {
    const user = await authenticator.authenticate("form", request);
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));

    session.set("user", user);

    const headers = new Headers({
      "Set-Cookie": await sessionStorage.commitSession(session)
    });

    return Response.json(user, { headers });
  } catch (error) {
    const session = await flashSessionStorage.getSession();
    session.flash("error", error instanceof Error ? error.message : "Invalid credentials");

    return redirect("/", {
      headers: {
        "Set-Cookie": await flashSessionStorage.commitSession(session),
      },
    });
  }
};

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="text-center p-4">
      {actionData?.name && <h1>Welcome {actionData.name}!</h1>}

      {actionData?.error && (
        <div className="text-red-500">Invalid credentials</div>
      )}
    </div>
  );
}