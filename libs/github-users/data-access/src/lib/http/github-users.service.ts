import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubUsers } from '@workspace/github-users/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GitHubUsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<GitHubUsers> {
    return this.httpClient.get<GitHubUsers>('https://api.github.com/userss');
  }
}
