import React from "react";
import type { PathLink } from "../../model/types/header";
import { NavLink } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib";

interface Props {
  link: PathLink;
  className?: string;
}

export const HeaderMenuItem = React.memo(
  ({ link: { path, onClick, label, isLoading }, className }: Props) => {
    return path ? (
      <NavLink className={className} to={path as string}>
        {({ isActive }) => (
          <Button
            className={cn(
              "text-base",
              isActive ? "text-blue-300" : "text-slate-200",
            )}
            variant="link"
          >
            {label}
          </Button>
        )}
      </NavLink>
    ) : (
      <Button
        className={cn(
          "text-slate-200 text-base disabled:!bg-transparent",
          className,
        )}
        variant="link"
        onClick={onClick}
        loading={isLoading}
      >
        {label}
      </Button>
    );
  },
);
