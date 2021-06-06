import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubUser } from '@workspace/github-users/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GitHubUsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<GitHubUser[]> {
    return this.httpClient.get<GitHubUser[]>('https://api.github.com/users');
  }
}
