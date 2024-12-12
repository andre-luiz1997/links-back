import { Module } from '@nestjs/common';
import { UtilsController } from './controllers/utils.controller';
import { UtilsService } from './services/utils.service';
import { GetAddressByZipcodeUseCase } from './usecases';
import { HttpModule } from '@nestjs/axios';
@Module({
	imports: [
		HttpModule
	],
	controllers: [UtilsController],
	providers: [
		UtilsService,
		{
			provide: GetAddressByZipcodeUseCase,
			useClass: GetAddressByZipcodeUseCase
		}
	],
})
export class UtilsModule { }