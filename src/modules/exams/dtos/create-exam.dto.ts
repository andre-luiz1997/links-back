import { IExams } from "../types/exams";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ResultEntryDTO } from "./result-entry.dto";

export class CreateExamDTO implements Omit<IExams, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'examType' | 'lab' | 'results'> {
  user: string;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  lab?: string;
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ResultEntryDTO)
  results: ResultEntryDTO[];
}