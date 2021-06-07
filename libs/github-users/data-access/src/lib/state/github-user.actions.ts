import { createAction, props } from '@ngrx/store';
import { GitHubUsers } from '@workspace/github-users/domain';

export const loadGithubUsers = createAction('[GithubUser] Load GithubUsers');

export const loadGithubUsersSuccess = createAction(
  '[GithubUser] Load GithubUsers Success',
  props<{ users: GitHubUsers }>()
);

export const loadGithubUsersFailure = createAction(
  '[GithubUser] Load GithubUsers Failure',
  props<{ error: string }>()
);
