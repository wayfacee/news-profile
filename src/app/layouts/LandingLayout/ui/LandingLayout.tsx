import { Container } from "@/shared/ui/Container";
import { Loader } from "@/shared/ui/Loader";
import { Header } from "@/widgets/Landing/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense fallback={<Loader />}>
        <Container>
          <Outlet />
        </Container>
      </Suspense>
      {/* <Footer /> */}
    </div>
  );
};
