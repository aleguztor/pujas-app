import { authenticator } from "@/service/auth.server";
import { commitSession, getSession } from "@/session";
import { LoaderFunction, redirect } from "@remix-run/node";

export let loader: LoaderFunction = async ({ request }) => {
  try {
    let user = await authenticator.authenticate("github", request);
    const session = await getSession();
    if (user == null) {
      session.flash("error", "Invalid username/password");

      // Redirect back to the login page with errors.
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    session.set("user", user);

    return redirect("/home/pujas", {
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
