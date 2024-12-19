import { Schema, Types } from "mongoose";
import { ProvidersEnum } from "src/constants";
import { IResultEntry } from "../types";
import { ApiProperty } from "@nestjs/swagger";
import { ExamTypesEntity } from "@modules/examTypes/entities/examTypes.entity";

export class ResultEntry implements IResultEntry {
  @ApiProperty({
    type: () => ExamTypesEntity
  })
  examType: ExamTypesEntity;
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
  @ApiProperty({
    required: false,
    type: () => ResultEntry
  })
  entryGroups?: ResultEntry[];
}

export const ResultEntrySchema = new Schema<ResultEntry>({});

ResultEntrySchema.add({
  examType: { type: Types.ObjectId, ref: ProvidersEnum.EXAMTYPES, required: true },
  value: { type: Number, required: true },
  unit: { type: String, required: false },
  observations: { type: String, required: false },
  method: { type: String, required: false },
  material: { type: String, required: false },
  entryGroups: {type: [ResultEntrySchema], required: false}
})