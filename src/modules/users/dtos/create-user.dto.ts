import { ApiProperty } from "@nestjs/swagger";
import { IUsers } from "../types/users";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Trim } from "@shared/transformers";
import { Transform } from "class-transformer";

export class CreateUserDTO implements Omit<IUsers, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'passwordHash'> {
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
  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @Trim()
  password: string;

  status = true; 
}