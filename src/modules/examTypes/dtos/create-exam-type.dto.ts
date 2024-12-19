import { ApiProperty } from "@nestjs/swagger";
import { IExamTypes, IExamTypesGroup } from "../types/examTypes";
import { Trim } from "@shared/transformers";
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { Type } from "class-transformer";

export class ExamTypesGroupDTO implements Omit<IExamTypesGroup,'examTypes'> {
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString()
  _id: Types.ObjectId;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExamTypeDTO)
  examTypes: IExamTypes[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  parentGroups?: Types.ObjectId[];
}

export class CreateExamTypeDTO implements Omit<IExamTypes, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
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
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  @Trim()
  material?: string;
  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  @Trim()
  method?: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamTypesGroupDTO)
  examTypesGroups?: IExamTypesGroup[];
}