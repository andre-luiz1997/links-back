import { IExams } from "../types/exams";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateExamDTO implements Omit<IExams, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'examType' | 'lab'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  lab?: string;
}