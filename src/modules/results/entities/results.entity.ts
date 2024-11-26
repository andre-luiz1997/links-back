import { ExamsEntity } from "@modules/exams/entities/exams.entity";
import { ExamTypesEntity } from "@modules/examTypes/entities/examTypes.entity";
import type { IResults } from "@modules/results/types/results";
import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";
import { ProvidersEnum } from "src/constants";
export class ResultsEntity implements IResults {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty({
    type: () => ExamsEntity
  })
  exam: ExamsEntity;
  @ApiProperty({
    type: () => ExamTypesEntity
  })
  examType: ExamTypesEntity;
  @ApiProperty()
  parameter: string;
  @ApiProperty()
  value: number;
  @ApiProperty({
    description: 'Measurement unit.',
    example: 'mg/dl',
    required: false
  })
  unit?: string;
  @ApiProperty({
    required: false
  })
  observations?: string;
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
export const ResultsSchema = new Schema<ResultsEntity>({
  _id: Types.ObjectId,
  exam: { type: Types.ObjectId, ref: ProvidersEnum.EXAMS, required: true },
  examType: {type: Types.ObjectId, ref: ProvidersEnum.EXAMTYPES, required: true},
  parameter: { type: String, required: true },
  value: { type: Number, required: true },
  unit: { type: String, required: false },
  observations: { type: String, required: false },
  method: { type: String, required: false },
  material: { type: String, required: false },
}, {
  timestamps: true,
})