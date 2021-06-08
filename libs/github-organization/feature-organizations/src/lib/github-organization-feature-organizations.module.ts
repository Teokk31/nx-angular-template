import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationsContainerComponent } from './organizations-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrganizationsContainerComponent],
  exports: [OrganizationsContainerComponent],
})
export class GithubOrganizationFeatureOrganizationsModule {}
