import { Authenticator } from 'remix-auth';
import { GitHubStrategy } from 'remix-auth-github';
import { getGithubProfile, GithubProfile } from './auth';

const authenticator = new Authenticator<GithubProfile>();

const gitHubStrategy = new GitHubStrategy(
  {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    redirectURI: 'http://localhost:5174/auth/github/callback',
  },
  async ({ tokens }) => {
    return await getGithubProfile(tokens.accessToken());
  }
);

authenticator.use(gitHubStrategy);

export { authenticator };
