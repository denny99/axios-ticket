import {Module} from '@nestjs/common';
import {HealthController} from './health.controller';
import {TerminusModule} from '@nestjs/terminus';
import {DatabaseModule} from '@deltastone/nest-common/database';

@Module({
  imports: [TerminusModule, DatabaseModule],
  controllers: [HealthController],
})
export class HealthModule {
}
