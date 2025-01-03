import { ROUTES } from "@/shared/config/router";
import { LS_ACCESS_TOKEN_KEY } from "@/shared/const";
import { getFromLS } from "@/shared/helpers/manageLocalStorage";
import { Navigate, useLocation } from "react-router-dom";

interface AuthRouteProps {
  children: JSX.Element;
}

export function AuthRoute({ children }: AuthRouteProps) {
  const isAuth = getFromLS(LS_ACCESS_TOKEN_KEY);
  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to={ROUTES.auth.route} state={{ from: location }} replace />
  );
}
