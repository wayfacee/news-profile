import cls from "./NewsPage.module.scss";
import { NewsFeed } from "@/widgets/NewsFeed";

const NewsPage = () => {
  return <NewsFeed className={cls.feed} />;
};

export default NewsPage;