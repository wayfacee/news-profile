import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig, RouteConfigProps } from "../config/routeConfig";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
  const renderWithWrapper = useCallback(
    ({ path, authOnly, element: Element }: RouteConfigProps) => {
      return (
        <Route
          key={path}
          path={path}
          element={
            authOnly ? (
              <RequireAuth>
                <Element />
              </RequireAuth>
            ) : (
              <Element />
            )
          }
        />
      );
    },
    [],
  );

  return (
    <Suspense fallback={"Loading.."}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
};

export default AppRouter;
