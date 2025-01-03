import { cn } from "@/shared/lib";
import React from "react";
import { useSelector } from "react-redux";
import { createNavLinks } from "../../model/lib/navLinks";
import cls from "./Header.module.scss";
import { HeaderMenuList } from "../HeaderMenuList/HeaderMenuList";
import { useLogoutMutation } from "@/entities/auth";
import { getFullProfile } from "@/entities/profile";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const authData = useSelector(getFullProfile);
  const [logout, { isLoading }] = useLogoutMutation();

  const onLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Ошибка при попытке выйти:", error);
    }
  };

  const navLinks = createNavLinks(onLogout, authData?.id, isLoading);

  return (
    <header className={cn(cls.header, className)}>
      <HeaderMenuList menuItems={navLinks} authData={authData} />
    </header>
  );
};