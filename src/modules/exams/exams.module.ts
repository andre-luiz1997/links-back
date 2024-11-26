import { forwardRef, Module } from '@nestjs/common';
import { ExamsController } from './controllers/exams.controller';
import { ExamsService } from './services/exams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamsProvider } from '@shared/providers';
import { LabsModule } from '@modules/labs/labs.module';
import { UsersModule } from '@modules/users/users.module';
import { ExamTypesModule } from '@modules/examTypes/examTypes.module';
@Module({
	imports: [
		MongooseModule.forFeature([ExamsProvider]),
		forwardRef(() => LabsModule),
		forwardRef(() => UsersModule),
		forwardRef(() => ExamTypesModule),
	],
	controllers: [ExamsController],
	providers: [ExamsService],
	exports: [ExamsService]
})
export class ExamsModule { }