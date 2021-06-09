export interface GitHubOrganizationResponse {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly url: string;
  readonly repos_url: string;
  readonly events_url: string;
  readonly hooks_url: string;
  readonly issues_url: string;
  readonly members_url: string;
  readonly public_members_url: string;
  readonly avatar_url: string;
  readonly description: null;
}

export type GitHubOrganizationResponses = readonly GitHubOrganizationResponse[];

export interface GitHubOrganization {
  readonly login: string;
  readonly id: number;
  readonly url: string;
  readonly avatarUrl: string;
}

export type GitHubOrganizations = readonly GitHubOrganization[];
