import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GithubUserEffects } from './state/github-user.effects';
import * as fromGithubUser from './state/github-user.reducer';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(
      fromGithubUser.githubUserFeatureKey,
      fromGithubUser.reducer
    ),
    EffectsModule.forFeature([GithubUserEffects]),
  ],
})
export class GithubUsersDataAccessModule {}
