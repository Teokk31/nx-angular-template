import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GitHubOrganizationStore } from '@workspace/github-organization/data-access';
import { GitHubOrganizations } from '@workspace/github-organization/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-organizations-container',
  template: `
    <div class="container">
      <div *ngFor="let organization of organizations$ | async">
        {{ organization.login }}
        <div>
          <img [src]="organization.avatarUrl" [width]="150" [height]="150" />
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
