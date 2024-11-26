import { ApiProperty } from "@nestjs/swagger";
import { IExamTypes } from "../types/examTypes";
import { Trim } from "@shared/transformers";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateExamTypeDTO implements Omit<IExamTypes, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Trim()
  description?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Trim()
  unit?: string;
}