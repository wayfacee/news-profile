import { getFullProfile, ProfileCard } from "@/entities/profile";
import { cn } from "@/shared/lib";
import { useSelector } from "react-redux";
import cls from "./ProfileSettings.module.scss";
import React from "react";

interface Props {
  className?: string;
}

export const ProfileSettings = React.memo(({ className }: Props) => {
  const data = useSelector(getFullProfile);
  // useSelector уже автоматически мемоизирует значение при помощи === сравнения

  return (
    <div className={cn(cls.container, className)}>
      <header className="mb-5">
        <h1 className={cls.h1}>Profile Settings</h1>
      </header>

      <ProfileCard profile={data} />
    </div>
  );
});
