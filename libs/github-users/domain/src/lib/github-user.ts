export interface GitHubUser {
  login: string;
  id: number;
  url: string;
}

export type GitHubUsers = GitHubUser[];