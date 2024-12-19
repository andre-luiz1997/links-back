import { IResultEntry } from "../types";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class ResultEntryDTO implements Omit<IResultEntry, 'examType' | 'entryGroups'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  examType: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  value: number;
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  unit?: string;
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  observations?: string;
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  method?: string;
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  material?: string;
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsArray()
  @Type(() => ResultEntryDTO)
  @ValidateNested({ each: true })
  entryGroups?: ResultEntryDTO[];
}