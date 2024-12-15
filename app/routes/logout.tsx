import { ActionFunction } from "react-router";
import { logout } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};