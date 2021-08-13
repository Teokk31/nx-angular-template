# Angular Best Practices

## Table of Contents

- [Angular Style Guide](#angular-style-guide)
- [Angular CLI](#angular-cli)
- [Angular Strict Mode](#angular-strict-mode)
- [Naming Convention](#naming-convention)
- [Module Organisation](#module-organisation)
- [Route-Level Code Splitting (Lazy Loading Module)](#route-level-code-splitting-lazy-loading-module)
- [Route Preloading Strategies](#route-preloading-strategies)
- [`OnPush` Change Detection Strategy](#onpush-change-detection-strategy)
- [Pure Pipes](#pure-pipes)
- [`@Input()` and `@Output`](#input-and-output)
- [Container (Smart) vs Presentational (Dumb) Components](#container-smart-vs-presentational-dumb-components)
- [RxJS Subscriptions and Unsubscribe](#rxjs-subscriptions-and-unsubscribe)
- [Linting](#linting)
- [Recommended Visual Studio Code Extensions](#recommended-visual-studio-code-extensions)
- [References](#references)

## Angular Style Guide

It is always recommended to check the official [Angular style guide](https://angular.io/guide/styleguide) by Angular team, whenever having any doubt.

## Angular CLI

It is recommended to utilise the Angular CLI whenever it is possible to initialise, develop, scaffold.

### Installation

```
npm install -g @angular/cli
```

### Generate New Application

```
ng generate new <project-name>
```

### Generate Angular Item

```
ng generate component <name>
ng g c <name>
```

### Build and Serves Angular Project

```
ng serve
ng s
```

### Build Angular Project

```
ng build
ng b
```

> 📝 Note: starts from version 12, `ng build` now defaults to production build.

To build production target project:

```
`ng build --configuration production`
```

> 📝 Note: starts from version 12, `ng build --config prod` has been deprecated.

### Update Angular Project

```
ng update
```

> 💡 Tip: `ng --help` lists available commands and their short descriptions.

## Angular Strict Mode

Strict mode improves maintainability and helps you catch bugs ahead of time. Additionally, strict mode applications are easier to statically analyze and can help the `ng update` command refactor code more safely and precisely when you are updating to future versions of Angular.

### Strict mode configuration

```
// tsconfig.json

{

  "angularCompilerOptions": {
    …
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "compilerOptions": {
    …
    "strict": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "downlevelIteration": true,
    "importHelpers": true,
    …
  }
}

```

> 📝 Note: starts from version 12, strict mode is enabled by default in the CLI.

## Naming Convention

It is always good to have the item name as suffix when we create one of the item in the Angular collection. The reason being is the developers can differentiate what are the function of the Angular item just by looking at the name. It also make the developers life easier when trying to look for any code file.

Bad ❌

```
capacity.ts
```

Good ✅

```
capacity.component.ts
```

Bad ❌

```
app.ts
```

Good ✅

```
app.routing.ts
```

Here are the common list of item in Angular:

```
component
directive
interface
interceptor
module
pipe
resolver
routing
service
```

## Module Organisation

Angular Modules are used to organize an application and consolidate components, directives, and pipes into blocks of functionality.

A good strategy can improve code organization, optimize the bundle size and make it easy to extend and refactor an application. A bad strategy can lead to dependency hell and larger bundles than necessary.

There are 3 strategies:

1. One module to rule them all!

![One module for all components](./images/single-module.png 'One module for all components')

2. One module per feature / view (Lazy Load)

![One module per feature](./images/classic.png 'One module per feature')

3. One module per component (SCAM)

![One module per component](./images/scam.png 'One module per component')

## Route-Level Code Splitting (Lazy Loading Module)

Angular modules are eagerly loaded by default. In order to lazy loading the modules, we can use route-level code splitting to achieve that.

Route-level code splitting are used to lazy loading the specific module only when the user navigate to the page by route.

Fortunately, Angular CLI make it easy for us:

```
ng generate module <module-name> --route <route-name> --module <declaring-module-name>
```

For example:

```
ng generate module work-order --route workorder --module app.routing
```

This will generate:

- A new routing module called `WorkOrderModule`.
- A route in `AppRoutingModule` called `workorder` that will dynamically load the `WorkOrderModule`.
- A default route in the `WorkOrderModule`.
- A component called `WorkOrderComponent` that will be rendered when the user hits the default route.

```
// app.routing.ts
…
@NgModule({
  imports: [RouterModule.forRoot(
      [
       {
        path: 'workorder',
        loadChildren: () => ('./workorder/work-order.module').then((m) => m.WorkOrderModule)
       }
      ])],
})
export class AppRoutingModule {}
```

```
// work-order.routing.ts
…
@NgModule({
  imports: [RouterModule.forChild(
      [
       path: '',
       component: WorkOrderComponent
      ])],
})
export class WorkOrderRoutingModule {}
```

```
// work-order.module.ts
…
@NgModule({
  declarations: [
    WorkOrderComponent
  ],
  imports: [
    CommonModule,
    WorkOrderRoutingModule
  ]
})
export class WorkOrderModule {}
```

> 📝 Note: For landing page, it is okay to load it eagerly.

## Route Preloading Strategies

Route-level code splitting can significantly improve an app's initial load time, but it comes at the cost of slowing down subsequent navigation.

One way to tackle this problem is **route preloading**.

Using preloading, when the user is at a given route, you can download and cache JavaScript associated with routes that are likely to be needed next. The Angular router provides this functionality out of the box.

The Angular router provides a configuration property called `preloadingStrategy`, which defines the logic for preloading and processing lazy-loaded Angular modules. We'll cover two possible strategies:

1. `PreloadAllModules`, which preloads all lazy-loaded routes, as the name implies.
2. `QuicklinkStrategy`, which preloads only the routes associated with links on the current page.

### Using the `PreloadAllModules` Strategy

```
// app.routing.ts

import { RouterModule, PreloadAllModules } from '@angular/router';
// …

RouterModule.forRoot([
  …
], {
  preloadingStrategy: PreloadAllModules
})
// …
```

### Using the Quicklink Preloading Strategy

The quicklink library provides a better strategy for larger apps.

It uses the IntersectionObserver API to preload only modules associated with links that are currently visible on the page.

You can add quicklink to an Angular app by using the [ngx-quicklink](https://www.npmjs.com/package/ngx-quicklink) package. Start by installing the package from npm:

```
npm install --save ngx-quicklink
```

Once it is available in your project, you can use `QuicklinkStrategy` by specifying the router's `preloadingStrategy` and importing the `QuicklinkModule`:

```
// app.routing.ts

import {QuicklinkStrategy, QuicklinkModule} from 'ngx-quicklink';
…

@NgModule({
  …
  imports: [
    …
    QuicklinkModule,
    RouterModule.forRoot([…], {
      preloadingStrategy: QuicklinkStrategy
    })
  ],
  …
})
export class AppRoutingModule {}
```

### Using the Quicklink preloading strategy across multiple lazy-loaded modules

The above example will work for a basic application but if your application contains multiple lazy-loaded modules you will need to import the `QuicklinkModule` into a shared module, export it and then import the shared module into your lazy-loaded modules.

First import the `QuicklinkModule` from `ngx-quicklink` into your shared module and export it:

```
// shared.module.ts

import { QuicklinkModule } from 'ngx-quicklink';
…

@NgModule({
  …
  imports: [
    QuicklinkModule
  ],
  exports: [
    QuicklinkModule
  ],
  …
})
export class SharedModule {}
```

Then import your SharedModule into all of your lazy-loaded modules:

```
// work-order.module.ts

import { SharedModule } from '@app/shared/shared.module';
…

@NgModule({
  …
  imports: [
      SharedModule
  ],
  …
});
```

`Quicklinks` will now be available in your lazy-loaded modules.

## `OnPush` Change Detection Strategy

Change detection in Angular detect changes in the state and triggers a refresh.

There are two strategies in Angular we can choose from:

1. Default - also known as CheckAlways
2. OnPush

![Change Detection](./images/change-detection.png 'Change Detection')

### Set `OnPush` Change Detection Strategy

```
// work-order.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
 …
 changeDetection: ChangeDetectionStrategy.OnPush
})
 WorkOrderComponent {}
```

### Default Set it to `OnPush` Change Detection Strategy on every newly Created Component

```
// angular.json

{
 …
"schematics": {
    "@schematics/angular:component": {
      "changeDetection": "OnPush"
    }
  }
 …
}
```

## Pure Pipes

It is always recommended to use pipe whenever there are the needs to transform the data in terms of formatting for display.

Pipe in Angular is pure by default, however you could set it to impure at the `@Pipe` decorator property.

Pure pipe will recalculate its result only if it receives a different input from its previous invocation.

> Bad ❌: It is not recommended to use pipe for sorting purpose as it heavily affected the performance.

## `@Input()` and `@Output`

Do use the `@Input()` and `@Output()` class decorators instead of the inputs and outputs properties of the `@Directive` and `@Component` metadata:

Consider placing `@Input()` or `@Output()` on the same line as the property it decorates.

**Why?** It is easier and more readable to identify which properties in a class are inputs or outputs.

**Why?** If you ever need to rename the property or event name associated with `@Input()` or `@Output()`, you can modify it in a single place.

**Why?** The metadata declaration attached to the directive is shorter and thus more readable.

**Why?** Placing the decorator on the same line usually makes for shorter code and still easily identifies the property as an input or output. Put it on the line above when doing so is clearly more readable.

Bad ❌

```
@Component({
  inputs: [
    'label'
  ],
  outputs: [
    'onChange'
  ]
})
export class ButtonComponent {
  onChange = new EventEmitter<any>();
  label: string;
}
```

Good ✅

```
@Component({
    …
})
export class ButtonComponent {
  @Output() onChange = new EventEmitter<any>();
  @Input() label = '';
}
```

## Container (Smart) vs Presentational (Dumb) Components

### Container Component

Container component can be think of it is like shipping containers:

- Contain all the state needed for presentational components in it is view.
- The template of a container component is made up entirely of presentational components and data bindings.
- Supply stream of observable data flow for presentational components.
- Connect to the presentational component with data bindings.
- Apply the `OnPush` change detection strategy.
- Deals with the the application state management (NgRx) and persistence layers (services) with dependency injection.

### Presentational Component

- Present application state to the user.
- Change application state triggered by user interaction.
- Have `@Input` properties for supplying them with data which will be formatted for display.
- Use `@Output` properties to notify application state changes initiated by user interactions.
- Apply the `OnPush` change detection strategy.
- Usually reusable.
- No side effects.

![Container Presentational Infographic](./images/container-presentational.png 'Container Presentational Infographic')

## RxJS Subscriptions and Unsubscribe

### Avoid Logic inside the Subscribe Function

Avoid logic inside subscribe function, think reactively!

Bad ❌

```
workOrder$.subscribe((workOrder: WorkOrder) => {
  if(!workOrder){
    return;
  }
  setWorkOrder(workOrder);
});
```

Good ✅

```
workOrder$.pipe(
  filter((w) => !!w),
).subscribe((workOrder: WorkOrder) => {
  setWorkOrder(workOrder);
});
```

RxJS have quite handful of [operators](https://www.learnrxjs.io/learn-rxjs/operators), utilise it!

### Avoid Nested Subscribes, Use Higher Order Mapping Operators

Avoid the nesting subscribes at all cost, it makes the codes not readable, complex and may cost the app have the unforeseen bugs that hard to debug.

Bad ❌

```
workOrder$.subscribe((workOrder: WorkOrder) => {
  getWorkOrderOperation(workOrder.id).subscribe((workOrderOperation) => {
    // do something with work order operation
  });
});
```

Good ✅

```
workOrder$.pipe(
  mergeMap((workOrder: WorkOrder) => getWorkOrderOperation(workOrder.id))
).subscribe((workOrder: WorkOrder) => {

});
```

### Always Unsubscribe, Prevent Memory Leaks

Observable is a stream.
When we subscribe to that stream, the subscription will continue to live on until it is completed or unsubscribes to prevent potential memory leaks.

There are several ways to unsubscribes, depends on your use case:

- Unsubscribe manually

```
workOrders$ = this.workOrderService.getWorkOrder(1).subscribe();

// unsubscribe manually
ngOnDestroy() {
  workOrders$.unsubscribe();
}
```

- `take` operator

```
const workOrders$ = this.workOrderService.getWorkOrder(1)
.pipe(
  take(1) // take operator will only take the first record and completes the stream
)
.subscribe();

```

- `takeUntil` operator

```
destroy$ = new Subject();

workOrders$ = this.workOrderService.getWorkOrder(1)
.pipe(
  takeUntil(this.destroy$) // do note that takeUntil always has to be the last operator in pipe.
)
.subscribe();

ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.complete();
}
```

- Async pipe

```
// just apply the async pipe to the observable
// async pipe unsubscribes automatically when the component get destroyed

<app-work-center [plants]='plants$ | async'>
</app-work-center>
```

### Don’t expose Subjects, Make it Private

It is common to have observable stream and subject in Angular service class so that we could reuse it, and it is sometimes a common mistake to exposing those subject and it is method like `next()`. This will cause some real bad thing if it is accidentally been called.

Bad ❌

```
class WorkOrderService {
  workOrderSubject = new Subject<WorkOrder>();

  workOrder$ = this.workOrderSubject.asObservable();
}
```

Good ✅

```
class WorkOrderService {
  private workOrderSubject = new Subject<WorkOrder>();

  workOrder$ = this.workOrderSubject.asObservable();
}
```

## Linting

Code linting is supported out of the box in Angular. It helps to make sure the project adhere to the clean code and styles, and finding potential code errors.

To get the linting feedback:

```
ng lint
```

To get the linting feedback and also fix the error(s) / warning(s), mainly style error(s) / warning(s):

```
ng lint --fix
```

> 📝 Note: TSLint has been deprecated as of 2019, consider to migrate from TSLint to ESLint.

### Migrating from TSLint to ESLint

At the root of your Angular project, run:

```
ng add @angular-eslint/schematics
```

After the above done, run:

```
ng g @angular-eslint/schematics:convert-tslint-to-eslint <project-name>
```

This will generate a new `.eslintrc` file at the root directory of the project by reference to the `tslint.json` file.

Feel free to remove the `tslint.json` file and uninstall both `tslint` and `codelyzer` after you verified everything is working fine.

### Hook the Linting up with Husky

At some point of your project that you might wants to automate the linting to prevent bad codes getting push into the repository.

You can achieve this with [Husky](https://typicode.github.io/husky/#/), basically Husky supports all Git hooks and you could run the code linting.

First:

```
npm install husky --save-dev
```

Then run the commands below, this will create a script under `package.json` and init the husky:

```
npm set-script prepare "husky install"
npm run prepare
```

Finally, this command will create the Husky `pre-commit` file and append `ng lint` command into it:

```
npx husky add .husky/pre-commit "ng lint"
```

Now you could try to commit some changes into the repository and the commit could be blocked if linter found any errors on it.

### Run Linting Against Staged Files Only

We could achieve this with libraries [lint-staged](https://www.npmjs.com/package/lint-staged), [ng-lint-staged](https://www.npmjs.com/package/ng-lint-staged).

First:

```
npm install lint-staged ng-lint-staged --save-dev
```

In `package.json`, add the script:

```
{
 …
"lint-staged": {
    "src/**/*.ts": "ng-lint-staged lint --"
  }
 …
}
```

Finally, in `.husky/pre-commit` file, change the command to:

```
npx lint-staged --no-stash --quiet
```

Cool, now the linting command only run against the staged `.ts` files and not the whole project.

## Recommended Visual Studio Code Extensions

| VSCode Extension                                                                                    |               Description               |
| --------------------------------------------------------------------------------------------------- | :-------------------------------------: |
| [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) |  Editor services for Angular templates  |
| [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)           | Angular TypeScript Snippets for VS Code |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)                |        VS Code ESLint extension         |
| [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)              |       UI console for Angular CLI        |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)              |       Opinionated Code Formatter        |

## References

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Angular Docs](https://angular.io/docs)
- [Angular Modules Best Practices](https://dev.to/this-is-angular/angular-modules-best-practices-2021-3lo5)
- [Angular - Build performant and progressive Angular applications](https://web.dev/angular/)
- [Angular Change Detection Infographic](https://chriskohler.dev/angular-change-detection-infographic)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Model-View-Presenter with Angular](https://dev.to/this-is-angular/model-view-presenter-with-angular-533h)
- [RxJS Best Practices](https://dev.to/nyagarcia/rxjs-best-practices-bhb)
