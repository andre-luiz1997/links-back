import { LabsModule } from '@modules/labs/labs.module';
import { Module } from '@nestjs/common';
import { MongooseModule, type MongooseModuleOptions } from '@nestjs/mongoose';
import { configureDotEnv } from '@shared/functions';
import { Providers } from '@shared/providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamTypesModule } from '@modules/examTypes/examTypes.module';
import { ReferenceValuesModule } from '@modules/referenceValues/referenceValues.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ExamsModule } from '@modules/exams/exams.module';
import { UtilsModule } from '@modules/utils/utils.module';
import { ReportsModule } from '@modules/reports/reports.module';
import { HealthIndicatorsModule } from '@modules/healthIndicators/healthIndicators.module';

configureDotEnv();

function getMongooseConfig(): { uri: string, options: MongooseModuleOptions } {
  let options: MongooseModuleOptions = {}
  if (process.env.DB_USER && process.env.DB_PWD) {
    options = {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
      }
    }
  }
  return {
    uri: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
    options
  }
}

const mongooseConfigs = getMongooseConfig();




@Module({
  imports: [
    MongooseModule.forRoot(mongooseConfigs.uri, mongooseConfigs.options),
    MongooseModule.forFeature(Providers),
    LabsModule,
    ExamTypesModule,
    ReferenceValuesModule,
    UsersModule,
    AuthModule,
    ExamsModule,
    UtilsModule,
    ReportsModule,
    HealthIndicatorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
