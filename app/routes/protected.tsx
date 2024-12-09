import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/services/auth.server";
import LogoutButton from "~/components/LogoutButton";
export const loader: LoaderFunction = async ({ request }) => {
  // This will redirect to "/" if user isn't authenticated
  const user = await requireUser(request);
  console.log("User", user);
  return Response.json({ user });
};

export default function ProtectedRoute() {
  const { user } = useLoaderData<typeof loader>();
  console.log(user);
  return (
    <div>
      <h1>Protected Route</h1>
      <p>Welcome {user.email}!</p>
      <LogoutButton />
    </div>
  );
}