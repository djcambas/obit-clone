import {
  //type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("/auth/login", "./routes/auth.login.tsx"),
  ...prefix("/protected", [
    layout("./routes/protected.tsx", [
      route("/dashboard", "./routes/protected.dashboard.tsx"),
      route("/profile", "./routes/protected.profile.tsx"),
    ]),
  ]),
];

