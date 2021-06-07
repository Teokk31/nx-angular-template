import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubUsers } from '@workspace/github-users/domain';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GitHubUsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<GitHubUsers> {
    return this.httpClient
      .get<GitHubUsers>('https://api.github.com/users')
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(error.error.message)
        )
      );
  }
}
