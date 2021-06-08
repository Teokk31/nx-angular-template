import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GitHubOrganizationStore } from '@workspace/github-organization/data-access';
import { GitHubOrganizations } from '@workspace/github-organization/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-organizations-container',
  template: `
    <ng-container *ngFor="let organization of organizations$ | async">
      <div>
        {{ organization.login }}
      </div>
    </ng-container>
    <ng-container *ngIf="errorMessage$ | async as errorMessage">
      {{ errorMessage }}
    </ng-container>
  `,
  styleUrls: ['./organizations-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [GitHubOrganizationStore],
})
export class OrganizationsContainerComponent {
  organizations$: Observable<GitHubOrganizations>;
  errorMessage$: Observable<string>;

  constructor(private store: GitHubOrganizationStore) {
    this.organizations$ = this.store.organizations$;
    this.errorMessage$ = this.store.errorMessage$;
  }
}
