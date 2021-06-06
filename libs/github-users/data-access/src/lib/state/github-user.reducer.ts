import { createReducer, on } from '@ngrx/store';
import { GitHubUser } from '@workspace/github-users/domain';
import * as GithubUserActions from './github-user.actions';

export const githubUserFeatureKey = 'githubUser';

export interface State {
  users: GitHubUser[];
}

export const initialState: State = {
  users: [],
};

export const reducer = createReducer(
  initialState,

  on(GithubUserActions.loadGithubUsers, (state) => state),
  on(GithubUserActions.loadGithubUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
  })),
  on(GithubUserActions.loadGithubUsersFailure, (state, action) => state)
);
