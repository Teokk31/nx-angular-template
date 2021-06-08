import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { GitHubOrganizations } from '@workspace/github-organization/domain';

interface GitHubOrganizationState {
  readonly organizations: GitHubOrganizations;
  readonly errorMessage: string;
}

const initialState: GitHubOrganizationState = {
  organizations: [],
  errorMessage: '',
};

@Injectable()
export class GitHubOrganizationStore extends ComponentStore<GitHubOrganizationState> {
  constructor() {
    super(initialState);
  }
}
