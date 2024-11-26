import { IResultEntry } from "../types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ResultEntryDTO implements Omit<IResultEntry, 'examType'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  examType: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  unit?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  observations?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  method?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  material?: string;
}