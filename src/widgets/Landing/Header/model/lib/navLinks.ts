import { ROUTES } from "@/shared/config/router";
import type { PathLink } from "../types/header";
import { type Profile } from "@/entities/profile";

export const createNavLinks = (
  onLogout: () => void,
  userId?: Profile["id"],
  isLoading?: boolean,
): PathLink[] => {
  return [
    { path: ROUTES.appRoute, label: "Новости" },
    { path: ROUTES.weather.page, label: "Погода" },
    { path: ROUTES.currency.page, label: "Валюта" },
    {
      path: ROUTES.profile.page,
      label: "Профиль",
      authOnly: true,
    },
    userId
      ? { onClick: onLogout, label: "Выйти", isLoading }
      : { path: ROUTES.auth.login.page, label: "Вход" },
  ];
};

// export const createNavLinks = (
//   onLogout: () => void,
//   userId?: User["id"]
// ): PathLink[] => {
//   const links: PathLink[] = [
//     { path: ROUTES.appRoute, label: "Новости" },
//     {
//       path: ROUTES.profile.page,
//       label: "Профиль",
//       authOnly: true,
//     },
//   ];

//   // Добавляем "Выйти" или "Вход" в зависимости от наличия userId
//   if (userId) {
//     links.push({ onClick: onLogout, label: "Выйти" });
//   } else {
//     links.push({ path: ROUTES.auth.login.page, label: "Вход" });
//   }

//   return links;
// };
