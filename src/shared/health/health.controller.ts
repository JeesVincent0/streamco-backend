import { Controller, Get } from '@nestjs/common';
import { RedisService } from '@/shared/infrastructure/cache/redis.service';

@Controller('health')
export class HealthController {
  constructor(private readonly redisService: RedisService) {}

  @Get('redis')
  async redisHealth() {
    const isHealthy = await this.redisService.ping();

    return {
      service: 'redis',
      status: isHealthy ? 'up' : 'down',
    };
  }
}
