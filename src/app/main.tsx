import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { Toaster } from "@/shared/ui/Toaster";
import { StoreProvider } from "./providers/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
      <Toaster />
    </StoreProvider>
  </StrictMode>,
);
