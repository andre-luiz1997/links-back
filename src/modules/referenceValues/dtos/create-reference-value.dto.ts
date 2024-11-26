import { IReferenceValues } from "../types/referenceValues";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReferenceValuesDTO implements Omit<IReferenceValues, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'examType'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  examType: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  ageRange?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  fastingState?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  category?: string;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  minValue?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  maxValue?: number;
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;
}