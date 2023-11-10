import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {RecordReuseStrategy} from '@deltastone/ngx-ds/form/common';
import {PageFrameComponent} from '@deltastone/ngx-ds/structure/page-frame';
import {apiRoutes} from './api.routes';

const routes: Routes = [
  {
    path: '',
    component: PageFrameComponent,
    children: [
      ...apiRoutes,
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('@deltastone/ngx-ds/pages/app-menu-page').then((m) => m.AppMenuPageComponent)
      },
      {
        path: 'error/:code',
        loadComponent: () => import('@deltastone/ngx-ds/pages/error-page').then((m) => m.ErrorPageComponent)
      },
      {
        path: '**',
        redirectTo: 'error/404'
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RecordReuseStrategy
    },
  ]
})
export class AppRoutingModule {
}
