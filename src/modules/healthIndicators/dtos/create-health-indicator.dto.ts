import { ApiProperty } from "@nestjs/swagger";
import { IHealthIndicators } from "../types/healthIndicators";
import { Trim } from "@shared/transformers";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateHealthIndicatorDTO implements Omit<IHealthIndicators, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;
  
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  @Trim()
  description?: string;
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  @Trim()
  unit?: string;
}