import { Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { LoginForm } from "../login/ui/LoginForm";

export const AuthForm = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        {/* <TabsTrigger value="register">Register</TabsTrigger> */}
      </TabsList>

      <LoginForm />
    </Tabs>
  );
};