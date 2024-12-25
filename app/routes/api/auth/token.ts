import { LoaderFunction } from "react-router";
import { sessionStorage } from "~/routes/_index";
import jwt from 'jsonwebtoken';

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  // Debug incoming request
  console.log("Token request received");
  console.log("Headers:", request.headers);

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  console.log("Session:", session); // Debug session

  const user = session.get("user");

  // Debug what we have
  console.log("Session user:", user);

  // Create a simplified token with just the necessary data
  const gameToken = {
    userId: user?.id || 'guest',
    email: user?.email,
    name: user?.name,
    // Add any other user data you need
  };

  const token = jwt.sign(
    gameToken,
    process.env.JWT_SECRET || 'your-secret-key', // Make sure to set JWT_SECRET in your environment variables
    { expiresIn: '15m' }
  );
  return Response.json({
    token
  }, {
    headers: {
      "Access-Control-Allow-Origin": "http://127.0.0.1:51264",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
  });
}