import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserSideTranslateLoader, TRANSLATION_LOCATIONS} from '@deltastone/ngx-ds/i18n';
import {LoadersComponent} from '@deltastone/ngx-ds/loaders';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
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
    LoadersComponent,
    ApiModule
  ],
  providers: [
    {
      provide: TRANSLATION_LOCATIONS,
      useValue: [
        'assets/i18n',
        'assets/i18n/i18n',
        'assets/form/common/i18n',
        'assets/form/input-rich-text/i18n',
        'assets/list/datatable/i18n',
        'assets/pages/error-page/i18n',
      ]
    }],
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (loader: BrowserSideTranslateLoader) => loader,
        deps: [BrowserSideTranslateLoader]
      },
      defaultLanguage: 'en'
    }),
    AppBrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppUiModule {
}
