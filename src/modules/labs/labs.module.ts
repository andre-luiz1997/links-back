import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabsProvider } from '@shared/providers';
import { LabsController } from './controllers/labs.controller';
import { LabsService } from './services/labs.service';


@Module({
	imports: [
		MongooseModule.forFeature([LabsProvider])
	],
	controllers: [LabsController],
	providers: [LabsService],
	exports: [LabsService]
})
export class LabsModule {}