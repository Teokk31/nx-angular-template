import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubUser, GitHubUsers } from '@workspace/github-users/domain';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { GitHubUserResponses } from '@workspace/github-users/domain';

@Injectable({ providedIn: 'root' })
export class GitHubUsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<GitHubUsers> {
    return this.httpClient
      .get<GitHubUserResponses>('https://api.github.com/users')
      .pipe(
        mergeMap((response) =>
          of(
            response.map(
              (user) =>
                ({
                  login: user.login,
                  id: user.id,
                  url: user.url,
                  avatarUrl: user.avatar_url,
                } as GitHubUser)
            )
          )
        ),
        catchError((error: HttpErrorResponse) =>
          throwError(error.error.message)
        )
      );
  }
}
