import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "@shared/transformers";
import { Transform } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SigninDTO {
  @ApiProperty()
  @IsString()
  @Trim()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
  @ApiProperty()
  @IsString()
  @Trim()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}