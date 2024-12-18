import { User } from "~/services/auth.server";
import LogoutButton from "./LogoutButton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "~/components/ui/sidebar"
import { Home, UserCircle } from "lucide-react" // You'll need to install lucide-react

type AppSidebarProps = {
  user: User;
};

export function AppSidebar({ user }: AppSidebarProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/protected/dashboard"
    },
    {
      title: "Profile",
      icon: UserCircle,
      url: "/protected/profile"
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold">Welcome, {user.name || user.email}!</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  )
}