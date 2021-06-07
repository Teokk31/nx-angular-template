import { createReducer, on } from '@ngrx/store';
import { GitHubUsers } from '@workspace/github-users/domain';
import * as GithubUserActions from './github-user.actions';

export const githubUserFeatureKey = 'gitHubUser';

export interface State {
  users: GitHubUsers;
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
