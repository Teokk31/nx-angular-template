export interface GitHubUser {
  readonly login: string;
  readonly id: number;
  readonly url: string;
}

export type GitHubUsers = readonly GitHubUser[];