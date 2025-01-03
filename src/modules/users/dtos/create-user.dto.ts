import { ApiProperty } from "@nestjs/swagger";
import { IUsers } from "../types/users";
import { IsArray, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { Trim } from "@shared/transformers";
import { Transform } from "class-transformer";
import { UpdateUserSettingsDTO } from "./update-user-setting.dto";

export class CreateUserDTO implements Omit<IUsers, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'passwordHash' | 'role'> {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @Trim()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @ApiProperty()
  @IsString()
  // @IsStrongPassword({
  //   minLength: 8,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  @IsNotEmpty()
  @Trim()
  password: string;
  @IsString()
  @IsOptional()
  role?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  settings?: UpdateUserSettingsDTO[];

  status = true; 
}