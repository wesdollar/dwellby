// app/routes/login.tsx
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import {
  Box,
  Button,
  Checkbox,
  Form,
  FormActions,
  FormControl,
  Heading,
  Input,
  Label,
} from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import { colors } from "~/constants/colors";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import { verifyLogin } from "~/models/user.server";
import { CenteredViewport } from "~/components/ui/centered-viewport/centered-viewport";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";

// const prisma = new PrismaClient()

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  if (userId) {
    return redirect("/dashboard");
  }

  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/dashboard");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const Login = () => {
  const emailInputName = "email";
  const passwordInputName = "password";
  const rememberMeText = "remember_me";

  return (
    <CenteredViewport>
      <InverseCard>
        <Box>
          <Heading as="h2" variant="heading30">
            <Box style={{ color: colors.brandPrimary }}>Log In</Box>
          </Heading>
        </Box>
        <Spacer
          height={[
            gutters.smBreakpoint.md,
            gutters.mdBreakpoint.md,
            gutters.lgBreakpoint.xs,
          ]}
        />
        <Form method="post">
          <FormControl>
            <Label htmlFor={emailInputName}>Email</Label>
            <Input type={emailInputName} name={emailInputName} required />
          </FormControl>
          <FormControl>
            <Label htmlFor={passwordInputName}>Password</Label>
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </FormControl>
          <FormControl>
            <Checkbox
              id={rememberMeText}
              value="true"
              name={rememberMeText}
              defaultChecked
            >
              I am an uncontrolled checkbox
            </Checkbox>
          </FormControl>
          <Box style={{ marginTop: "-20px" }}>
            <FormActions>
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </FormActions>
          </Box>
        </Form>
      </InverseCard>
    </CenteredViewport>
  );
};

export default Login;
