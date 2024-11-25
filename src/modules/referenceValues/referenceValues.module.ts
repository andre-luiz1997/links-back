import { Module } from '@nestjs/common';
import { ReferenceValuesController } from './controllers/referenceValues.controller';
import { ReferenceValuesService } from './services/referenceValues.service';
Module({
	imports: [],
	controllers: [ReferenceValuesController],
	providers: [ReferenceValuesService],
})
export class ReferenceValuesModule {}