import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GithubUsersDataAccessModule } from '@workspace/github-users/data-access';
import { UsersContainerComponent } from './users-container.component';

@NgModule({
  imports: [CommonModule, GithubUsersDataAccessModule],
  declarations: [
    UsersContainerComponent
  ],
  exports: [
    UsersContainerComponent
  ],
})
export class GithubUsersFeatureUsersModule {}
