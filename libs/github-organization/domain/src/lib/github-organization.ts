export interface GitHubOrganization {
  readonly login: string;
  readonly id: number;
  readonly url: string;
}

export type GitHubOrganizations = readonly GitHubOrganization[];
