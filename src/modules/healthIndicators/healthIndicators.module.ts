import { Module } from '@nestjs/common';
import { HealthIndicatorsController } from './controllers/healthIndicators.controller';
import { HealthIndicatorsService } from './services/healthIndicators.service';
import { HealthIndicatorsProvider } from '@shared/providers';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
	imports: [
		MongooseModule.forFeature([HealthIndicatorsProvider])
	],
	controllers: [HealthIndicatorsController],
	providers: [HealthIndicatorsService],
	exports: [HealthIndicatorsService]
})
export class HealthIndicatorsModule {}