import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github";

const authenticator = new Authenticator<string>();

const gitHubStrategy = new GitHubStrategy(
  {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    redirectURI: "http://localhost:5174/auth/github/callback",
  },
  async ({ tokens }) => {
    return await tokens.accessToken();
  }
);

authenticator.use(gitHubStrategy);

export { authenticator };
