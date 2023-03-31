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
  useToaster,
} from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import { colors } from "~/constants/colors";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import { verifyLogin } from "~/models/user.server";
import { CenteredViewport } from "~/components/ui/centered-viewport/centered-viewport";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";
import { httpStatusCodes } from "~/constants/http-status-codes";
import { errorResponse } from "~/helpers/responses/error-response/error-response";
import { Toaster } from "@twilio-paste/core/toast";
import { useActionData, useLoaderData } from "@remix-run/react";
import type { ErrorResponse as ErrorResponseInterface } from "~/helpers/responses/error-response/types/error-response";
import { useEffect } from "react";

function hasDescription(errors: any): errors is { description: string } {
  return "description" in errors;
}

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
      { errors: { email: "Email is invalid.", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required." } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      errorResponse(
        httpStatusCodes.unauthorized,
        "invalid credentials",
        "Your credentials are invalid."
      )
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
  const toaster = useToaster();
  const data = useLoaderData<ErrorResponseInterface>();
  const actionData = useActionData<ErrorResponseInterface>();

  useEffect(() => {
    if (data.errors) {
      if (hasDescription(data.errors)) {
        toaster.push({
          message: data.errors.description,
          variant: "error",
        });
      }
    }

    if (actionData?.errors) {
      if (hasDescription(actionData.errors)) {
        toaster.push({
          message: actionData.errors.description,
          variant: "error",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CenteredViewport>
        <InverseCard width="450px">
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
                type={passwordInputName}
                name={passwordInputName}
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
                remember me
              </Checkbox>
            </FormControl>
            <Box
              style={{
                marginTop: "-20px",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <FormActions>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </FormActions>
            </Box>
          </Form>
        </InverseCard>
      </CenteredViewport>
      <Toaster left={["space40", "unset", "unset"]} {...toaster} />;
    </>
  );
};

export default Login;
