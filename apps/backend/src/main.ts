import {setupDomino} from '@deltastone/nest-common/polyfill/ssr.polyfill.js';
import {join} from 'path';
import {Transport} from '@nestjs/microservices';
import {ConfigService} from './app/config/config.service';

setupDomino(join(process.cwd(), 'dist/apps/frontend'));import {RedocService} from '@deltastone/nest-common/redoc';
import {LoggerService} from '@deltastone/nest-common/logger';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useLogger(await app.resolve(LoggerService));
  
        const configService = app.get(ConfigService);
app.get(RedocService).createDocument(app);
const port = process.env.PORT || 3000;
  
  await app.connectMicroservice({
          transport: Transport.NATS,
          options: {
            servers: [`nats://${configService.msAddress}:${configService.msPort}`],
          }
        },
        {
          inheritAppConfig: true,
        });
  await app.startAllMicroservices();
await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
