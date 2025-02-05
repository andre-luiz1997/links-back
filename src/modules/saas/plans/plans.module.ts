import { PlansService } from './services/plans.service';
import { PlansController } from './controllers/plans.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        PlansController,],
    providers: [
        PlansService,],
})
export class PlansModule { }
