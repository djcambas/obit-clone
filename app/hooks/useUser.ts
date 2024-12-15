import { useMatches } from "react-router";
import type { User } from "~/services/auth.server";

interface RouteData {
  user: User;
}

export function useUser(): User | undefined {
  const matches = useMatches();
  console.log("Matches:", matches); // Debugging line

  const parentMatch = matches.find(
    (match) => match.id === "routes/protected/index"
  );

  return (parentMatch?.data as RouteData | undefined)?.user;
}