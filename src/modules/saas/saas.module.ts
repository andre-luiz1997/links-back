import { Module } from '@nestjs/common';
import { PlansModule } from './plans/plans.module';
@Module({
	imports: [
		PlansModule
	],
	exports: [
		PlansModule
	]
})
export class SaasModule {}