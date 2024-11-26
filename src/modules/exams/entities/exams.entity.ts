import type { IExams } from "@modules/exams/types/exams";
import { LabsEntity } from "@modules/labs/entities/labs.entity";
import { UsersEntity } from "@modules/users/entities/users.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";
import { ProvidersEnum } from "src/constants";
import { ResultEntry, ResultEntrySchema } from "./result-entry.entity";

export class ExamsEntity implements IExams {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty({
    type: () => UsersEntity
  })
  user: UsersEntity;
  @ApiProperty()
  date: Date;
  @ApiProperty({
    type: () => LabsEntity,
    required: false
  })
  lab?: LabsEntity;
  @ApiProperty({
    type: () => Array<ResultEntry>
  })
  results: ResultEntry[];
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
  date: {type: Date, required: true},
  lab: {type: Types.ObjectId, ref: ProvidersEnum.LABS, required: false},
  results: { type: [ResultEntrySchema], required: false, default: [] },
}, {
  timestamps: true
})