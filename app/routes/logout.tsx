import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { logout } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const logoutAction = await logout(request);

  return logoutAction;
}

export async function loader({ request }: LoaderArgs) {
  const logoutSession = await logout(request);

  return logoutSession;
}
