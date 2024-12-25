import { LoaderFunction, useLoaderData, Outlet } from "react-router";
import { requireUser, User } from "~/services/auth.server";
import { AppSidebar } from "~/components/AppSidebar";
import { SidebarTrigger, SidebarProvider } from "~/components/ui/sidebar";

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
      <SidebarProvider>
        <div className="flex">
          <AppSidebar user={user} />
          <main className="flex-1">
            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}