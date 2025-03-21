import {
  redirect,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Pujasn app" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = () => {
  return redirect("/home");
};
