import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubOrganizations } from '@workspace/github-organization/domain';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GitHubOrganizationService {
  constructor(private httpClient: HttpClient) {}

  getOrganizations(): Observable<GitHubOrganizations> {
    return this.httpClient
      .get<GitHubOrganizations>('https://api.github.com/organizations')
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(error.error.message)
        )
      );
  }
}
