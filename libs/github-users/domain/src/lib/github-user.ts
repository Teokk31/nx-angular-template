export interface GitHubUserResponse {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly avatar_url: string;
  readonly gravatar_id: string;
  readonly url: string;
  readonly html_url: string;
  readonly followers_url: string;
  readonly following_url: string;
  readonly gists_url: string;
  readonly starred_url: string;
  readonly subscriptions_url: string;
  readonly organizations_url: string;
  readonly repos_url: string;
  readonly events_url: string;
  readonly received_events_url: string;
  readonly type: string;
  readonly site_admin: boolean;
}

export type GitHubUserResponses = readonly GitHubUserResponse[];

export interface GitHubUser {
  readonly login: string;
  readonly id: number;
  readonly url: string;
  readonly avatarUrl: string;
}

export type GitHubUsers = readonly GitHubUser[];
