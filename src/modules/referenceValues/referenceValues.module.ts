import { forwardRef, Module } from '@nestjs/common';
import { ReferenceValuesController } from './controllers/referenceValues.controller';
import { ReferenceValuesService } from './services/referenceValues.service';
import { ReferenceValuesProvider } from '@shared/providers';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamTypesModule } from '@modules/examTypes/examTypes.module';
@Module({
	imports: [
		MongooseModule.forFeature([ReferenceValuesProvider]),
		forwardRef(() => ExamTypesModule)
	],
	controllers: [ReferenceValuesController],
	providers: [ReferenceValuesService],
	exports: [ReferenceValuesService]
})
export class ReferenceValuesModule {}