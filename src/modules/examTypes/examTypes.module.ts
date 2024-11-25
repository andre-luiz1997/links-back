import { Module } from '@nestjs/common';
import { ExamTypesController } from './controllers/examTypes.controller';
import { ExamTypesService } from './services/examTypes.service';
Module({
	imports: [],
	controllers: [ExamTypesController],
	providers: [ExamTypesService],
})
export class ExamTypesModule {}