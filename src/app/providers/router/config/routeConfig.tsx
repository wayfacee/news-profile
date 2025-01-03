import App from "@/app/App";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/config/router";

import { AuthPage } from "@/pages/AuthPage";
import { NewsPage } from "@/pages/NewsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { WeatherDetailsPage } from "@/pages/WeatherDetailsPage";
import { CurrencyPage } from "@/pages/CurrencyPage";
import { WeatherPage } from "@/pages/WeatherPage";

import { LandingLayout } from "@/app/layouts/LandingLayout";
import { MainLayout } from "@/app/layouts/MainLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { WeatherLayout } from "@/app/layouts/WeatherLayout";

import { withAuth, withoutAuth } from "../lib/auth";

export const router = createBrowserRouter([
  {
    path: ROUTES.appRoute,
    element: <App />,
    children: [
      {
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <NewsPage />,
          },
          {
            path: ROUTES.notFound,
            element: <Navigate to={ROUTES.appRoute} replace />,
          },
          {
            path: ROUTES.weather.route,
            element: <WeatherLayout />,
            children: [
              {
                index: true,
                element: <WeatherPage />,
              },
              {
                path: ROUTES.weather.city.route,
                element: <WeatherDetailsPage />,
              },
            ],
          },
          {
            path: ROUTES.currency.route,
            element: <CurrencyPage />,
          },
        ],
      },

      {
        element: withAuth(<MainLayout />),
        children: [
          {
            index: true,
            element: <NewsPage />,
          },
          {
            path: ROUTES.profile.route,
            element: <Outlet />,
            children: [{ index: true, element: <ProfilePage /> }],
          },
        ],
      },

      {
        path: ROUTES.auth.route,
        element: withoutAuth(<AuthLayout />),
        children: [
          {
            path: ROUTES.auth.login.route,
            element: <AuthPage />,
          },
          {
            path: ROUTES.auth.register.route,
            element: <AuthPage />,
          },
        ],
      },
    ],
  },
]);
