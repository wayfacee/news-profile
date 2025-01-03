import { ROUTES } from "@/shared/config/router";
import { LS_ACCESS_TOKEN_KEY } from "@/shared/const";
import { getFromLS } from "@/shared/helpers/manageLocalStorage";
import { Navigate, useLocation } from "react-router-dom";

interface UnAuthRouteProps {
  children: JSX.Element;
}

export function UnAuthRoute({ children }: UnAuthRouteProps) {
  const isAuth = getFromLS(LS_ACCESS_TOKEN_KEY);
  const location = useLocation();

  return !isAuth ? (
    children
  ) : (
    <Navigate to={ROUTES.appRoute} state={{ from: location }} replace />
  );
}
