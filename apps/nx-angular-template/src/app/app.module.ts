import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GithubUsersFeatureUsersModule } from './../../../../libs/github-users/feature-users/src/lib/github-users-feature-users.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, GithubUsersFeatureUsersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
