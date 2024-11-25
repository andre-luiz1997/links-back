import { Module } from '@nestjs/common';
import { ExamsController } from './controllers/exams.controller';
import { ExamsService } from './services/exams.service';
Module({
	imports: [],
	controllers: [ExamsController],
	providers: [ExamsService],
})
export class ExamsModule {}