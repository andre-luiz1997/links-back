import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthIndicatorsProvider } from '@shared/providers';
import { HealthIndicatorsController } from './healthindicators.controller';
import { HealthIndicatorsService } from './healthindicators.service';
import { UsersModule } from '@modules/users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([HealthIndicatorsProvider]),
        forwardRef(() => UsersModule)
    ],
    controllers: [
        HealthIndicatorsController
    ],
    providers: [
        HealthIndicatorsService
    ],
    exports: [
        HealthIndicatorsService
    ]
})
export class HealthIndicatorsModule { }
