import { Module } from '@nestjs/common';
import { LabsController } from './controllers/labs.controller';
import { LabsService } from './services/labs.service';
Module({
	imports: [],
	controllers: [LabsController],
	providers: [LabsService],
})
export class LabsModule {}