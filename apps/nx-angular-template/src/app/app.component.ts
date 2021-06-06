import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GitHubUserActions, GitHubUserSelectors } from '@workspace/github-users/data-access';
import { GitHubUser } from '@workspace/github-users/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'nx-angular-template';

  users$: Observable<GitHubUser[]>;
  constructor(private store: Store)  {
        this.users$ = this.store.select(GitHubUserSelectors.selectAllGithubUsers);
        this.store.dispatch(GitHubUserActions.loadGithubUsers());
  }
}
