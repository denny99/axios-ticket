import {Inject, Injectable, Optional} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {TranslateService} from '@ngx-translate/core';

import {Request} from 'express';
import * as moment from 'moment';
import {PrimeNGConfig} from 'primeng/api';
import {first} from 'rxjs';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  public constructor(
          private configService: ConfigService,
          private primengConfig: PrimeNGConfig,
          private translateService: TranslateService,
          @Optional() @Inject(REQUEST) private request?: Request) {
    this.translateService.setDefaultLang('en');
    // not required this is global
    // eslint-disable-next-line rxjs/no-ignored-subscription
    translateService.onLangChange.subscribe((event) => {
      moment.locale(event.lang);
    });
    // either use the browser language or the first language from the accept-language header
    const browserLang = this.translateService.getBrowserLang() ??
            request?.headers['accept-language']?.split(',')[0].split('-')[0];
    if (browserLang) {
      this.translateService.use(browserLang);
    }
    primengConfig.ripple = !this.configService.config.isServer;
    // eslint-disable-next-line rxjs/no-ignored-subscription
    this.translateService.get('primeng').pipe(first()).subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
