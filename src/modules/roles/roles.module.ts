import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
@Module({
	imports: [],
	controllers: [RolesController],
	providers: [RolesService],
})
export class RolesModule {}