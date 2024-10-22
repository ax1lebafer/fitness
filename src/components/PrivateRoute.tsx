import { useUser } from "../hooks/useUser.ts";
import { Navigate, Outlet } from "react-router-dom";
import { appRoutes } from "../lib/appRoutes.ts";

export default function PrivateRoute() {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to={appRoutes.HOME} />;
}
