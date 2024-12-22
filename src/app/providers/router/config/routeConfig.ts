import { AuthPage } from "@/pages/AuthPage";
import { MainPage } from "@/pages/MainPage";
import { NewsPage } from "@/pages/NewsPage";
import { ProfilePage } from "@/pages/ProfilePage";

export interface RouteConfigProps {
  path: string;
  element: React.ComponentType;
  authOnly?: boolean;
}

export const routeConfig: RouteConfigProps[] = [
  { path: "/", element: MainPage },
  { path: "/auth", element: AuthPage },
  { path: "/news", element: NewsPage },
  { path: "/profile/:id", element: ProfilePage, authOnly: true },
];
