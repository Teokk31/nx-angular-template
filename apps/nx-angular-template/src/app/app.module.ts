import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GithubUsersDataAccessModule } from '@workspace/github-users/data-access';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, GithubUsersDataAccessModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
