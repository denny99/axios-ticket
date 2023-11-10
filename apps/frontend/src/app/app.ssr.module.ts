import {ServerInterceptorModule} from '@deltastone/ngx-ds/http';
import {ServerSideTranslateLoader} from '@deltastone/ngx-ds/i18n';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppBrowserModule } from "./app.browser.module";

@NgModule({
  imports: [
    ServerModule,
    AppBrowserModule,
ServerInterceptorModule,
TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (loader: ServerSideTranslateLoader) => loader,
        deps: [ServerSideTranslateLoader]
      },
      defaultLanguage: 'en'
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppSsrModule { }
