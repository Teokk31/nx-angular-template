import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGithubUser from './github-user.reducer';

export const selectGithubUserState = createFeatureSelector<fromGithubUser.State>(
  fromGithubUser.githubUserFeatureKey
);

export const selectAllGithubUsers = createSelector(
  selectGithubUserState,
  (state) => state.users
);
