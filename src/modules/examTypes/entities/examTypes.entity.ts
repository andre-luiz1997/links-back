import type { IExamTypes, IExamTypesGroup } from "@modules/examTypes/types/examTypes";
import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";
import { ProvidersEnum } from "src/constants";
export class ExamTypesEntity implements IExamTypes {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty({
    description: 'Measurement unit.',
    example: 'mg/dl'
  })
  unit?: string;
  @ApiProperty({
    description: 'Material of the exam.',
    example: 'Blood'
  })
  material?: string;
  @ApiProperty({
    description: 'Method of the exam.',
    example: 'ELISA'
  })
  method?: string;

  @ApiProperty({
    description: 'Group of exams derived of the main examType',
  })
  examTypesGroups?: IExamTypesGroup[];

  @ApiProperty({
    required: false
  })
  parentGroups?: Types.ObjectId[];

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

export class ExamTypesGroupEntity implements IExamTypesGroup {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  examTypes: ExamTypesEntity[];
}

export const ExamTypesGroupSchema = new Schema<ExamTypesGroupEntity>({
  name: { type: String, required: true },
  examTypes: [{ type: Schema.Types.ObjectId, ref: ProvidersEnum.EXAMTYPES }]
}, { _id: true });

export const ExamTypesSchema = new Schema<ExamTypesEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: false },
  unit: { type: String, required: false },
  material: { type: String, required: false },
  method: { type: String, required: false },
  examTypesGroups: [{ type: ExamTypesGroupSchema, required: false }],
  parentGroups: [{type: Types.ObjectId, required: false}]
}, {
  timestamps: true,
})