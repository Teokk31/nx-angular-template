import { createAction, props } from '@ngrx/store';
import { GitHubUser } from '@workspace/github-users/domain';

export const loadGithubUsers = createAction('[GithubUser] Load GithubUsers');

export const loadGithubUsersSuccess = createAction(
  '[GithubUser] Load GithubUsers Success',
  props<{ users: GitHubUser[] }>()
);

export const loadGithubUsersFailure = createAction(
  '[GithubUser] Load GithubUsers Failure',
  props<{ error: any }>()
);
