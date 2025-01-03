import { NewsList, useNewsQuery } from "@/entities/news";
import { cn } from "@/shared/lib";
import { Loader } from "@/shared/ui/Loader";
import cls from "./NewsFeed.module.scss";

interface Props {
  className?: string;
}

// не нуждается в мемоизации, так как его ререндер зависит от хука useNewsQuery,
export const NewsFeed = ({ className }: Props) => {
  const { data, isLoading } = useNewsQuery();

  return (
    <div className={cn(cls.wrapper, className)}>
      {data && <NewsList news={data} className={cls.content} />}

      {isLoading && <Loader />}
    </div>
  );
};