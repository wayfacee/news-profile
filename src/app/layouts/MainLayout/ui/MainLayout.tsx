import { ROUTES } from "@/shared/config/router";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";
import { ErrorElement } from "@/shared/ui/ErrorElement";
import { Header } from "@/widgets/Landing/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { SkeletonGenerator } from "../model/helper/SkeletonGenerator";
import { Container } from "@/shared/ui/Container";

export const MainLayout = () => {
  return (
    <Suspense fallback={"Suspensing..."}>
      <section className="flex flex-col min-h-screen">
        <Header />

        <ErrorBoundary fallback={<ErrorElement path={ROUTES.appRoute} />}>
          <Container asWhat="main">
            <Suspense fallback={<SkeletonGenerator />}>
              <Outlet />
            </Suspense>
          </Container>
        </ErrorBoundary>
      </section>
    </Suspense>
  );
};
