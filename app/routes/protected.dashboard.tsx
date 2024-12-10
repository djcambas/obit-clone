import { useUser } from "~/hooks/useUser";

export default function Dashboard() {
  const user = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      {/* Add more dashboard-related content here */}
    </div>
  );
}