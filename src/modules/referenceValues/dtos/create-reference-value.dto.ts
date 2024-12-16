import { IFastingValues, IReferenceValues } from "../types/referenceValues";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class FastingValuesDTO {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  minValue?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  maxValue?: number;
}

export class CreateReferenceValuesDTO implements Omit<IReferenceValues, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'examType'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  examType: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  ageRange?: string;
  @Type(() => FastingValuesDTO)
  @IsOptional()
  @ApiProperty()
  fastingValues?: IFastingValues;
  @Type(() => FastingValuesDTO)
  @IsOptional()
  @ApiProperty()
  nonFastingValues?: IFastingValues;
  @IsString()
  @IsOptional()
  @ApiProperty()
  category?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;
}