import { cn } from "@/shared/lib";
import React from "react";
import { Container } from "@/shared/ui/Container";
import cls from "./HeaderMenuList.module.scss";
import type { PathLink } from "../../model/types/header";
import { HeaderMenuItem } from "../HeaderMenuItem/HeaderMenuItem";
import { Profile } from "@/entities/profile";

interface Props {
  menuItems: PathLink[];
  authData: Profile | null;
  className?: string;
}

export const HeaderMenuList: React.FC<Props> = ({
  menuItems,
  authData,
  className,
}) => {
  return (
    <Container className={cn(cls.container, className)}>
      {menuItems
        .filter(({ authOnly }) => !authOnly || authData)
        .map((link) => (
          <HeaderMenuItem key={link.label} link={link} />
        ))}
    </Container>
  );
};