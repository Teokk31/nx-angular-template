import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { GitHubUserActions } from '../..';
import { GitHubUsersService } from '../http/github-users.service';
import * as GithubUserActions from './github-user.actions';

@Injectable()
export class GithubUserEffects {
  loadGithubUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(GithubUserActions.loadGithubUsers),
      concatMap(() =>
        this.gitHubUsersService.getUsers().pipe(
          map((users) => GithubUserActions.loadGithubUsersSuccess({ users })),
          catchError((error: HttpErrorResponse) => of(GitHubUserActions.loadGithubUsersFailure({error: error.error.message})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private gitHubUsersService: GitHubUsersService
  ) {}
}
