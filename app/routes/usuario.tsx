import { GithubProfile } from "@/service/auth";
import { isAuthPages } from "@/utils/cookies";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const { response, isAuth, session } = await isAuthPages(request);

  if (isAuth) {
    return session.get("user");
  }
  return response;
};
export default function Usuario() {
  const user = useLoaderData<GithubProfile>();
  return <h1>{user.login}</h1>;
}
