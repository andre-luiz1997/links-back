import { Module } from '@nestjs/common';
import { ExamTypesController } from './controllers/examTypes.controller';
import { ExamTypesService } from './services/examTypes.service';
import { ExamTypesProvider } from '@shared/providers';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
	imports: [
		MongooseModule.forFeature([ExamTypesProvider])
	],
	controllers: [ExamTypesController],
	providers: [ExamTypesService],
	exports: [ExamTypesService]
})
export class ExamTypesModule {}