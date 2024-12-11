import { LoaderFunction, useLoaderData, Outlet } from "react-router";
import { requireUser, User } from "~/services/auth.server";
import Sidebar from "~/components/Sidebar";

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return { user };
};

export default function ProtectedLayout() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}