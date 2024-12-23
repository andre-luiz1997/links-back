import { forwardRef, Module } from '@nestjs/common';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './services/reports.service';
import { UsersModule } from '@modules/users/users.module';
import { ExamTypesModule } from '@modules/examTypes/examTypes.module';
import { ExamsModule } from '@modules/exams/exams.module';
@Module({
	imports: [
		forwardRef(() => UsersModule),
		forwardRef(() => ExamTypesModule),
		forwardRef(() => ExamsModule),
	],
	controllers: [ReportsController],
	providers: [ReportsService],
})
export class ReportsModule {}