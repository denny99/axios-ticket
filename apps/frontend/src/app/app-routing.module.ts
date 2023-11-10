import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {apiRoutes} from './api.routes';

const routes: Routes = [
  {
    path: '',
    children: [
      ...apiRoutes,
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
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
  ]
})
export class AppRoutingModule {
}
