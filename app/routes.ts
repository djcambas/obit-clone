import {
  //type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("/login", "./routes/unprotected/login.tsx"),
  route("/logout", "./routes/logout.tsx"),
  route("/signup", "./routes/unprotected/signup.tsx"),
  route("/api/auth/token", "./routes/api/auth/token.ts"),
  ...prefix("/protected", [
    layout("./routes/protected/index.tsx", [
      index("./routes/protected/protected.index.tsx"),
      route("/dashboard", "./routes/protected/dashboard.tsx"),
      route("/profile", "./routes/protected/profile.tsx"),
      route("/games/test-game", "./routes/protected/games/test-game.tsx"),
    ]),
  ]),
];

