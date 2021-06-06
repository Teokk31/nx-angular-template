import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@workspace/root/environments';

import { metaReducers, reducers } from './reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 25,
    }),
  ],
})
export class RootDataAccessRootModule {}

@NgModule({})
export class RootDataAccessModule {
  static forRoot(): ModuleWithProviders<RootDataAccessRootModule> {
    return {
      ngModule: RootDataAccessRootModule,
    };
  }
}
