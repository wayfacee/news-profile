import { AuthForm } from "@/features/auth";
import { Button, Container } from "@/shared/ui";
import { Link } from "react-router-dom";

const MainPage = () => {
  const items = [
    { id: 1, title: "Вход", to: "/auth" },
    { id: 2, title: "Новости", to: "/news" },
    { id: 3, title: "Профиль", to: "/profile" },
  ];

  return (
    <Container className="flex gap-3 flex-col items-center justify-center ">
      <h5 className="font-medium text-xl">
        Добро пожаловать в Profile News! Мы рады, что вы с нами. Здесь вы
        найдете самые свежие новости и обновления, а также сможете перейти к
        различным разделам приложения для еще большего удобства. Оставайтесь с
        нами, чтобы быть в курсе всех событий!
      </h5>

      <div className="flex flex-row gap-3">
        {items.map(({ id, title, to }) => (
          <Button className="text-slate-800" variant="link" key={id} asChild>
            <Link to={to}>{title}</Link>
          </Button>
        ))}
      </div>

      <AuthForm />
    </Container>
  );
};

export default MainPage;
