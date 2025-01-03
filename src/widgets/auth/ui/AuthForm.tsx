import { LoginForm } from "@/features/auth/login";
import { ROUTES } from "@/shared/config/router";
import { cn } from "@/shared/lib";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export const AuthForm = ({ className }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const value = pathname.includes("login") ? "login" : "register";

  return (
    <Tabs defaultValue={value} className={cn("w-[400px]", className)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          onClick={() => navigate(ROUTES.auth.login.page)}
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="register"
          onClick={() => navigate(ROUTES.auth.register.page)}
        >
          Register
        </TabsTrigger>
      </TabsList>

      <LoginForm />
    </Tabs>
  );
};
