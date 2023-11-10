import {RedisService} from '@deltastone/nest-common/database';
import {Public} from '@deltastone/nest-common/auth';
import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  public constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private http: HttpHealthIndicator,
    private redis: RedisService
  ) {
  }

  /**
   * check if alle relevant metrics are ok
   */
  @Get()
  @Public()
  @ApiOperation({
    summary: 'Get health status of container',
    operationId: 'healthCheck',
  })
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.memory.checkHeap('heap', 1024 * 1024 * 1024), // 1gb
      () => this.memory.checkRSS('rss', 1.5 * 1024 * 1024 * 1024),
      () => this.pingRedis()
    ]);
  }

  public async pingRedis(): Promise<HealthIndicatorResult> {
    return {
      redis: {
        status: await this.redis.ping() ? 'up' : 'down',
      },
    };
  }
}
