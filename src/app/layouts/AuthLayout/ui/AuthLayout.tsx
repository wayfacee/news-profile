import { ROUTES } from "@/shared/config/router";
import { ErrorElement } from "@/shared/ui/ErrorElement";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";
import { Loader } from "@/shared/ui/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Landing/Header";
import { Container } from "@/shared/ui/Container";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallback={<ErrorElement path={ROUTES.appRoute} />}>
          <Container>
            <Outlet />
          </Container>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};