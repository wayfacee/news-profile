import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import type { NewsPost } from "../../model/types/news";
import React from "react";
import { cn } from "@/shared/lib";
import cls from "./NewsCard.module.scss";

interface Props {
  newsPost: NewsPost;
  className?: string;
}

export const NewsCard = React.memo(
  ({ newsPost: { title, body }, className }: Props) => {
    return (
      <Card className={cn(cls.card, className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{body}</CardDescription>
        </CardHeader>
      </Card>
    );
  },
);
