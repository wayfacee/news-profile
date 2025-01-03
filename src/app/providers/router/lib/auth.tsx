import { AuthRoute } from "../ui/AuthRoute";
import { UnAuthRoute } from "../ui/UnAuthRoute";

export const withAuth = (element: JSX.Element) => (
  <AuthRoute>{element}</AuthRoute>
);

export const withoutAuth = (element: JSX.Element) => (
  <UnAuthRoute>{element}</UnAuthRoute>
);
