import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import type { Profile } from "../../model/types/profile";
import { cn } from "@/shared/lib";
import { ProfileCardSkeleton } from "./ProfileCard.skeleton";
import React from "react";

interface Props {
  profile: Profile | null;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export const ProfileCard = React.memo(({
  profile,
  isLoading,
  isError,
  className,
}: Props) => {
  if (isLoading) return <ProfileCardSkeleton className={className} />;
  if (isError) return <p>Произошла ошибка... Попробуйте позже! ProfileCard</p>;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Персональная информация</CardTitle>
        <CardDescription>
          Вы можете обновите свою личную информацию.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={profile?.name} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={profile?.email}
                type="email"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue={profile?.city} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                defaultValue={profile?.companyName}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
});
