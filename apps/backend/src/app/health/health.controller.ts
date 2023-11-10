import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
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
  ) {
  }

  /**
   * check if alle relevant metrics are ok
   */
  @Get()
  @ApiOperation({
    summary: 'Get health status of container',
    operationId: 'healthCheck',
  })
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.memory.checkHeap('heap', 1024 * 1024 * 1024), // 1gb
      () => this.memory.checkRSS('rss', 1.5 * 1024 * 1024 * 1024),
    ]);
  }
}
