import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsContainerComponent } from './organizations-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrganizationsContainerComponent],
  exports: [OrganizationsContainerComponent],
})
export class GithubOrganizationFeatureOrganizationsModule {}
