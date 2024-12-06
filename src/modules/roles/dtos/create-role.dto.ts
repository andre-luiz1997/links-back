import { ApiProperty } from "@nestjs/swagger";
import { IRoles } from "../types/roles";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateRoleDTO implements Omit<IRoles, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  permissions: string[];
}