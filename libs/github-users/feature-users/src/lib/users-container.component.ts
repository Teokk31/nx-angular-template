import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GitHubUserActions,
  GitHubUserSelectors,
} from '@workspace/github-users/data-access';
import { GitHubUsers } from '@workspace/github-users/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-users-container',
  template: `
    <ng-container *ngFor="let user of users$ | async">
      <div>
        {{ user.login }}
      </div>
    </ng-container>
    <ng-container *ngIf="errorMessage$ | async as errorMessage">
      {{ errorMessage }}
    </ng-container>
  `,
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent {
  users$: Observable<GitHubUsers>;
  errorMessage$: Observable<string>;

  constructor(private store: Store) {
    this.users$ = this.store.select(GitHubUserSelectors.selectAllGithubUsers);
    this.errorMessage$ = this.store.select(
      GitHubUserSelectors.selectErrorMessage
    );

    this.store.dispatch(GitHubUserActions.loadGithubUsers());
  }
}
