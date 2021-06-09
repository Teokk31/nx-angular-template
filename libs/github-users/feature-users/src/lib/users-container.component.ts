import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GithubUserActions,
  GithubUserFeature,
  GithubUserSelectors,
} from '@workspace/github-users/data-access';
import { GitHubUsers } from '@workspace/github-users/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-users-container',
  template: `
    <div class="container">
      <div *ngFor="let user of users$ | async">
        <a target="_blank" [href]="user.githubUrl">
          {{ user.login }}
        </a>
        <div>
          <img [src]="user.avatarUrl" [width]="150" [height]="150" />
        </div>
      </div>
    </div>
    <ng-container *ngIf="errorMessage$ | async as errorMessage">
      {{ errorMessage }}
    </ng-container>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-wrap: wrap;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent {
  users$: Observable<GitHubUsers>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<GithubUserFeature.State>) {
    this.users$ = this.store.select(GithubUserSelectors.selectAllGithubUsers);
    this.errorMessage$ = this.store.select(
      GithubUserSelectors.selectErrorMessage
    );

    this.store.dispatch(GithubUserActions.loadGithubUsers());
  }
}
