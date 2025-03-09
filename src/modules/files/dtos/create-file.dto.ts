import { Types } from "mongoose";
import { IFiles } from "../types/files";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFileDTO implements Omit<IFiles, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  originalName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  path: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  model?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  modelId?: Types.ObjectId;
  @ApiProperty()
  @IsOptional()
  @IsString()
  key?: string;
}