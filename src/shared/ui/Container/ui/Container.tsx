import { cn } from "../../../lib/utils";
import React from "react";

interface Props {
  asWhat?: React.ElementType;
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  asWhat = "div",
  className,
  children,
}) => {
  const Component = asWhat;

  return (
    <Component className={cn("mx-auto max-w-[1380px]", className)}>
      {children}
    </Component>
  );
};