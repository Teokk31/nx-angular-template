import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GithubOrganizationFeatureOrganizationsModule } from '@workspace/github-organization/feature-organizations';
import { GithubUsersFeatureUsersModule } from '@workspace/github-users/feature-users';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    GithubUsersFeatureUsersModule,
    GithubOrganizationFeatureOrganizationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
