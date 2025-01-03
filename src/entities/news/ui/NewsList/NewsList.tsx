import React from "react";
import type { NewsPost } from "../../model/types/news";
import { NewsCard } from "../NewsCard/NewsCard";

interface Props {
  news: NewsPost[];
  className?: string;
}

export const NewsList = React.memo(({ news, className }: Props) => {
  return (
    <div className={className}>
      {news.map((post) => (
        <NewsCard key={post.id} newsPost={post} />
      ))}
    </div>
  );
});