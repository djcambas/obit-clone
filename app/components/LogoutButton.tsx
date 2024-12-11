import { Form } from "react-router";

export default function LogoutButton() {
  return (
    <Form action="/auth/logout" method="post">
      <button
        type="submit"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </Form>
  );
}