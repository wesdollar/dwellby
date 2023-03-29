// app/routes/login.tsx
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import {
  Box,
  Button,
  Form,
  FormActions,
  FormControl,
  Heading,
  Input,
  Label,
} from "@twilio-paste/core";
import { authenticationStrategyName } from "~/constants/auth";
import { authenticator } from "~/services/auth.server";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import { colors } from "~/constants/colors";
import { getSession } from "~/services/session.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader = async () => {
  const user = await prisma.user.findUnique({ where: { id: 1 } });

  if (user) {
    redirect("/dashboard");
  }

  return json({});
};

export async function action({ request }: ActionArgs) {
  const formBody = request;

  let authenticatedSession;

  try {
    authenticatedSession = await authenticator.authenticate(
      authenticationStrategyName,
      formBody
    );
  } catch (error) {
    console.error(error);
  }

  console.log("authenticatedSession: ", authenticatedSession);

  return json({});
}

export const Login = () => {
  const emailInputName = "email";
  const passwordInputName = "password";

  return (
    <Box
      display={"flex"}
      width="100%"
      height={"100vh"}
      justifyContent="center"
      alignItems={"center"}
    >
      <InverseCard>
        <Box color={colors.text.brandPrimary}>
          <Heading
            color={"colorTextIconBrandHighlight"}
            as="h2"
            variant="heading30"
          >
            Login
          </Heading>
        </Box>
        <Form method="post">
          <FormControl>
            <Label htmlFor={emailInputName}>Email</Label>
            <Input
              type={emailInputName}
              name={emailInputName}
              required
              defaultValue="github@dollardojo.tech"
            />
          </FormControl>
          <FormControl>
            <Label htmlFor={passwordInputName}>Password</Label>
            <Input
              defaultValue={"password"}
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </FormControl>
          <FormActions>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </FormActions>
        </Form>
      </InverseCard>
    </Box>
  );
};

export default Login;
