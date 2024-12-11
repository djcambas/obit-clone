import { Link } from "react-router";
import type { User } from "~/services/auth.server";
import LogoutButton from "./LogoutButton";

type SidebarProps = {
  user: User;
};

export default function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold">Welcome, {user.name || user.email}!</h2>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/protected/dashboard">Dashboard</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/protected/profile">Profile</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}