import { PlansService } from './services/plans.service';
import { PlansController } from './controllers/plans.controller';
import { Module } from '@nestjs/common';
import { PlansProvider } from '@shared/providers';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([PlansProvider])
    ],
    controllers: [
        PlansController
    ],
    providers: [
        PlansService
    ],
    exports: [
        PlansService
    ]
})
export class PlansModule { }
