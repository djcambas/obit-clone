import {
  //type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("/auth/login", "./routes/unprotected/login.tsx"),
  route("/auth/logout", "./routes/logout.tsx"),
  route("/auth/signup", "./routes/unprotected/signup.tsx"),
  ...prefix("/protected", [
    layout("./routes/protected/index.tsx", [
      index("./routes/protected/protected.index.tsx"),
      route("/dashboard", "./routes/protected/dashboard.tsx"),
      route("/profile", "./routes/protected/profile.tsx"),
    ]),
  ]),
];

