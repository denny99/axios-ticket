import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
import {ApiModule} from './api.module';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ApiModule
  ],
  providers: [],
  bootstrap: [],
})
export class AppBrowserModule {
}

// ad stuff here that should only be loaded on the client
@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot({
      fastFadeOut: true,
      minTime: 50,
      masterLoaderId: 'routerLoader'
    }),
    NgxUiLoaderRouterModule.forRoot({loaderId: 'routerLoader', showForeground: true}),
    NgxUiLoaderHttpModule.forRoot({loaderId: 'httpLoader', delay: 100, showForeground: true}),
    AppBrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppUiModule {
}
