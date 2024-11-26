import type { IExams } from "@modules/exams/types/exams";
import { ExamTypesEntity } from "@modules/examTypes/entities/examTypes.entity";
import { LabsEntity } from "@modules/labs/entities/labs.entity";
import { UsersEntity } from "@modules/users/entities/users.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";
import { ProvidersEnum } from "src/constants";
export class ExamsEntity implements IExams {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty({
    type: () => UsersEntity
  })
  user: UsersEntity;
  @ApiProperty({
    type: () => ExamTypesEntity
  })
  examType: ExamTypesEntity;
  @ApiProperty()
  date: Date;
  @ApiProperty({
    type: () => LabsEntity,
    required: false
  })
  lab?: LabsEntity;
  @ApiProperty({
    required: false
  })
  method?: string;
  @ApiProperty({
    required: false
  })
  material?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({
    required: false
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false
  })
  deletedAt?: Date;
}
export const ExamsSchema = new Schema<ExamsEntity>({
  _id: Types.ObjectId,
  user: {type: Types.ObjectId, ref: ProvidersEnum.USERS, required: true},
  examType: {type: Types.ObjectId, ref: ProvidersEnum.EXAMTYPES, required: true},
  date: {type: Date, required: true},
  lab: {type: Types.ObjectId, ref: ProvidersEnum.LABS, required: false},
  method: {type: String, required: false},
  material: {type: String, required: false},
}, {
  timestamps: true
})