import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GitHubOrganization,
  GitHubOrganizationResponses,
  GitHubOrganizations,
} from '@workspace/github-organization/domain';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GitHubOrganizationService {
  constructor(private httpClient: HttpClient) {}

  getOrganizations(): Observable<GitHubOrganizations> {
    return this.httpClient
      .get<GitHubOrganizationResponses>('https://api.github.com/organizations')
      .pipe(
        mergeMap((response) =>
          of(
            response.map(
              (organization) =>
                ({
                  login: organization.login,
                  id: organization.id,
                  url: organization.url,
                  avatarUrl: organization.avatar_url,
                  githubUrl: organization.html_url,
                } as GitHubOrganization)
            )
          )
        ),
        catchError((error: HttpErrorResponse) =>
          throwError(error.error.message)
        )
      );
  }
}
