import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersProvider } from '@shared/providers';
import { RolesModule } from '@modules/roles/roles.module';
import { HealthIndicatorsModule } from './modules/health-indicators/healthindicators.module';
@Module({
	imports: [
		MongooseModule.forFeature([UsersProvider]),
		forwardRef(() => RolesModule),
		forwardRef(() => HealthIndicatorsModule),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService,HealthIndicatorsModule]
})
export class UsersModule {}