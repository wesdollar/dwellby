// app/services/auth.server.ts
import { FormStrategy } from "remix-auth-form";
import { Authenticator } from "remix-auth";
import { sessionStorage, createUserSession } from "~/services/session.server";
import { compare } from "bcrypt";
// import invariant from "tiny-invariant";
import { authenticationStrategyName as AUTHENTICATION_STRATEGY_NAME } from "~/constants/auth";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User | false>(sessionStorage);

authenticator.use(
  // @ts-ignore
  new FormStrategy(async ({ request, context }) => {
    // TODO: clean up types
    const email = request.get("email") as string;
    const password = request.get("password") as string;

    // // // You can validate the inputs however you want
    // invariant(typeof email === "string", "email must be a string");
    // invariant(email.length > 0, "username must not be empty");
    // invariant(typeof password === "string", "password must be a string");
    // invariant(password.length > 0, "password must not be empty");

    if (!email || !password) {
      return false;
    }

    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as User;

    let authenticationResult;

    if (user?.password) {
      authenticationResult = await compare(password, user.password);
    } else {
      return false;
    }

    if (authenticationResult) {
      return user;
    }
  }),
  AUTHENTICATION_STRATEGY_NAME
);
