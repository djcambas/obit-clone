import { useLoaderData, data, LoaderFunction } from "react-router";
import { createGameToken, requireUser } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  // Get user from session
  const user = await requireUser(request);

  // Create token using centralized function
  const token = createGameToken(user);

  return data({ token });
};

export default function TestGame() {
  const { token } = useLoaderData<{ token: string }>();
  console.log(token);
  const gameUrl = `/game/index.html?token=${encodeURIComponent(token)}`;
  console.log("Game URL: ", gameUrl);
  return (
    <div>
      <h1>My Awesome Game</h1>
      <iframe
        title="My Awesome Game"
        src={gameUrl}
        width="800"
        height="600"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}
