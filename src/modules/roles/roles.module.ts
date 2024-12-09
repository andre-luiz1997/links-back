import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesProvider } from '@shared/providers';
@Module({
	imports: [
		MongooseModule.forFeature([RolesProvider])
	],
	controllers: [RolesController],
	providers: [RolesService],
	exports: [RolesService]
})
export class RolesModule {}