import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/:cca3", "routes/detail.tsx")
] satisfies RouteConfig;
