import {Module} from '@nestjs/common';
import * as fs from 'fs';
import {join} from 'path';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HealthModule} from './health/health.module';

const packageJson = JSON.parse(fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));

@Module({
  imports: [HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
