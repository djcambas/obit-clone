import { useActionData, redirect, data } from "react-router";
import { authenticator, flashSessionStorage } from "~/services/auth.server";
import { sessionStorage } from "~/routes/_index";
import type { User } from "~/services/auth.server";
export async function action({ request }: { request: Request }) {
  try {
    const user = await authenticator.authenticate("form", request);
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));

    session.set("user", user);

    const headers = new Headers({
      "Set-Cookie": await sessionStorage.commitSession(session)
    });

    return data({ user }, { headers });
  } catch (error) {
    const session = await flashSessionStorage.getSession();
    session.flash("error", error instanceof Error ? error.message : "Invalid credentials");

    return redirect("/", {
      headers: {
        "Set-Cookie": await flashSessionStorage.commitSession(session),
      },
    });
  }
}

export default function LoginRoute() {
  const actionData = useActionData<{ user?: User; error?: string }>();
  return (
    <div className="text-center p-4">
      {actionData?.user?.name && <h1>Welcome {actionData.user.name}!</h1>}

      {actionData?.error && (
        <div className="text-red-500">Invalid credentials</div>
      )}
    </div>
  );
}