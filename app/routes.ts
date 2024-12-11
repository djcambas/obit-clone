import {
  //type RouteConfig,
  route,
  index,
  // layout,
  // prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("/auth/login", "./routes/auth.login.tsx"),
];

