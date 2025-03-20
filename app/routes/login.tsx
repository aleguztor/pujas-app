import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticator } from "@/service/auth.server";
import { commitSession, getSession } from "@/session";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect("/home");
  }

  const data = { error: session.get("error") };

  return Response.json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
export default function Login() {
  return (
    <>
      <div className="flex items-center center w-full justify-center h-full">
        <section className="bg-amber-400 flex items-center justify-center w-[65%] shadow-2xl h-screen max-md:hidden ">
          <h1>Pújame</h1>
        </section>
        <section className="flex items-center justify-center flex-col w-[35%]">
          <h3 className="p-4">Inicio de sesión</h3>
          <form
            className="flex items-center  center flex-col gap-5 w-fit"
            action=""
            method="post">
            <div>
              <label htmlFor="username"></label>
              <Input
                type="text"
                placeholder="username"
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <Input
                type="password"
                placeholder="password"
              />
            </div>
            <div>
              <Button type="submit">Entrar</Button>
            </div>
          </form>
          <Form method="post">
            <button>Login with GitHub</button>
          </Form>
        </section>
      </div>
    </>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const tokenUser = await authenticator.authenticate("github", request);

  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (tokenUser == null) {
      session.flash("error", "Invalid username/password");

      // Redirect back to the login page with errors.
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    session.set("token", tokenUser);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error("Error durante la autenticación de GitHub:", error);
    return new Response("Hubo un error en el proceso de autenticación", {
      status: 500,
    });
  }
};
