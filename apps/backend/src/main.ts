/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {join} from 'path';

import {AppModule} from './app/app.module';
import {setupDomino} from './app/ssr.polyfill';
setupDomino(join(process.cwd(), 'dist/apps/frontend'));
require('axios');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
          `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
