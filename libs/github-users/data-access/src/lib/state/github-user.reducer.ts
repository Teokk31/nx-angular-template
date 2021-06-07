import { createReducer, on } from '@ngrx/store';
import { GitHubUsers } from '@workspace/github-users/domain';
import * as GithubUserActions from './github-user.actions';

export const githubUserFeatureKey = 'gitHubUser';

export interface State {
  readonly users: GitHubUsers;
  readonly errorMessage: string;
}

export const initialState: State = {
  users: [],
  errorMessage: '',
};

export const reducer = createReducer(
  initialState,

  on(GithubUserActions.loadGithubUsers, (state) => state),
  on(GithubUserActions.loadGithubUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
    errorMessage: '',
  })),
  on(GithubUserActions.loadGithubUsersFailure, (state, action) => ({
    ...state,
    users: [],
    errorMessage: action.error,
  }))
);
