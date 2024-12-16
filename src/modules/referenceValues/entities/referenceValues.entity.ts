import { ExamTypesEntity } from "@modules/examTypes/entities/examTypes.entity";
import type { IFastingValues, IReferenceValues } from "@modules/referenceValues/types/referenceValues";
import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";
import { ProvidersEnum } from "src/constants";
import { FastingValuesDTO } from "../dtos";

export class ReferenceValuesEntity implements IReferenceValues {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty({
    type: () => ExamTypesEntity
  })
  examType: ExamTypesEntity;
  @ApiProperty({
    required: false,
    type: String,
    example: 'Adultos com mais de 20 anos'
  })
  ageRange?: string;
  @ApiProperty({
    required: false,
    type: FastingValuesDTO
  })
  fastingValues?: IFastingValues;
  @ApiProperty({
    required: false,
    type: FastingValuesDTO
  })
  nonFastingValues?: IFastingValues;
  @ApiProperty({
    required: false,
    type: String,
    examples: ['Risco baixo', 'Risco alto']
  })
  category?: string;
  @ApiProperty({
    required: false,
    type: Number
  })
  minValue?: number;
  @ApiProperty({
    required: false,
    type: Number
  })
  maxValue?: number;
  @ApiProperty({
    required: false,
    type: String
  })
  description?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({
    required: false,
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false,
  })
  deletedAt?: Date;
}

export const FastingValuesSchema = new Schema<IFastingValues>({
  minValue: { type: Number, required: false },
  maxValue: { type: Number, required: false }
}, { _id: false })

export const ReferenceValuesSchema = new Schema<ReferenceValuesEntity>({
  _id: Types.ObjectId,
  examType: { type: Schema.Types.ObjectId, ref: ProvidersEnum.EXAMTYPES, required: true },
  ageRange: { type: String, required: false },
  fastingValues: { type: FastingValuesSchema, required: false },
  nonFastingValues: { type: FastingValuesSchema, required: false },
  category: { type: String, required: false },
  minValue: { type: Number, required: false },
  maxValue: { type: Number, required: false },
  description: { type: String, required: false },
}, {
  timestamps: true
})