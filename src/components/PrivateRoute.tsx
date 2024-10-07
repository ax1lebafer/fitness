import { useUser } from "../hooks/useUser.ts";
import { Navigate, Outlet } from "react-router-dom";
import { appRoutes } from "../lib/appRoutes.ts";

export default function PrivateRoute() {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to={appRoutes.HOME} />;
}
