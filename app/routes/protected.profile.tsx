import { useUser } from "~/hooks/useUser";

export default function Profile() {
  const user = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add more profile-related content here */}
    </div>
  );
}