import { Button } from "@/shared/ui/Button";
import { Form } from "@/shared/ui/Form";
import { FormInput } from "@/shared/ui/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { TabsContent } from "@/shared/ui/Tabs";
import { useForm } from "react-hook-form";
import { formLoginSchema } from "../model/constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/entities/auth";
import { LoginSchema } from "../model/types/loginTypes";

export const LoginForm = () => {
  const [login] = useLoginMutation();
  
  const form = useForm<LoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "Admin",
      password: "12345",
    },
  });

  const onSubmit = async ({ username, password }: LoginSchema) => {
    await login({ username, password });
  };

  return (
    <Form {...form}>
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
                  label="Password"
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
    </Form>
  );
};
