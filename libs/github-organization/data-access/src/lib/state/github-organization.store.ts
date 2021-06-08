import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { GitHubOrganizations } from '@workspace/github-organization/domain';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { GitHubOrganizationService } from './../http/github-organization.service';

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
  organizations$: Observable<GitHubOrganizations> = this.select(
    (state) => state.organizations
  );
  errorMessage$: Observable<string> = this.select(
    (state) => state.errorMessage
  );

  constructor(private gitHubOrganizationService: GitHubOrganizationService) {
    super(initialState);

    this.queryOrganizations();
  }

  private queryOrganizations = this.effect<void>((_$) => {
    return _$.pipe(
      mergeMap(() =>
        this.gitHubOrganizationService.getOrganizations().pipe(
          tapResponse(
            (response) => this.updateOrganizations(response),
            (error) => this.updateErrorMessage(error as string)
          )
        )
      )
    );
  });

  private updateOrganizations = this.updater<GitHubOrganizations>(
    (state, response) => ({
      ...state,
      organizations: response,
      errorMessage: '',
    })
  );

  private updateErrorMessage = this.updater<string>((state, response) => ({
    ...state,
    organizations: [],
    errorMessage: response,
  }));
}
