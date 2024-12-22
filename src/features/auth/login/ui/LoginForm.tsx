import { Button, FormInput } from "@/shared/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { TabsContent } from "@/shared/ui";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "../model/constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useToast } from "@/shared/hooks";
import { loginByUsername } from "../model/services/loginByUsername";
import { useNavigate } from "react-router-dom";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "Admin",
      password: "12345",
    },
  });

  const onSubmit = async ({ username, password }: TFormLoginValues) => {
    try {
      const result = await dispatch(loginByUsername({ username, password }));
      const userId = JSON.parse(
        localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
      );

      if (result.meta.requestStatus === "rejected") {
        throw Error();
      }

      toast({
        title: "Вы успешно вошли в свой аккаунт!",
      });
      navigate(`/profile/${userId}`);
    } catch (e) {
      console.log("error LOGINFORM", e);
      toast({
        variant: "destructive",
        title: "Не удалось войти в аккаунт",
        description: "Введите корректные данные или попробуйте позже!",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <TabsContent value="login" asChild>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <FormInput
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-1">
                <FormInput
                  name="password"
                  label="Пароль"
                  type="password"
                  required
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" loading={form.formState.isSubmitting}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </FormProvider>
  );
};
