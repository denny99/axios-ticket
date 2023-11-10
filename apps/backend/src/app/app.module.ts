import {NavigationModule} from '@deltastone/nest-common/navigation';
import {frontendNavigation} from './navigation/navigation';
import {ConfigService, config as c} from './config/config.service';
import { ConfigModule } from './config/config.module';
import {HealthModule} from './health/health.module';
import {LoggerModule} from '@deltastone/nest-common/logger';
import {ApiBaseModule} from '@deltastone/nest-common/api';
import {RedocModule} from '@deltastone/nest-common/redoc';
import * as fs from 'fs'
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AngularUniversalModule } from "@deltastone/nest-nguniversal";
import { join } from "path";

const packageJson = JSON.parse(fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
@Module({
  imports: [HealthModule,
    ConfigModule,
NavigationModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        natsHost: config.msAddress,
        natsPort: config.msPort,
        appName: config.applicationName,
        appColor: config.applicationColor,
        appIcon: config.applicationIcon,
        enableMicroApplications: config.enableMicroApplications,
        serverAddress: config.serverAddress,
        routes: [
          ...frontendNavigation,
        ],
      }),
    }),
    ApiBaseModule,
    LoggerModule,
    RedocModule.register({
      path: '/docs',
      version: packageJson.version,
      options: {
        logo: {
          backgroundColor: '#F0F0F0',
        },
        sortPropsAlphabetically: true,
        hideDownloadButton: false,
        hideHostname: false,
      }
    }),
    AngularUniversalModule.forRoot({
      bootstrap: join(process.cwd(), 'dist/apps/frontend/ssr/main.js'),
      viewsPath: join(process.cwd(), 'dist/apps/frontend/browser'),
        cache: c.ssrCaching,
        extraProviders: [
        {
          provide: 'clientPath',
          useValue: join(process.cwd(), 'dist/apps/frontend/browser'),
        }, {
          provide: 'domain',
          useValue: c.applicationDomain
        },
        {
          provide: 'version',
          useValue: packageJson.version
        }
        ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
