import { SettingsEnum } from "src/constants";
import { IUserSetting } from "../types/setting";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserSettingsDTO implements IUserSetting {
  @IsString()
  @IsEnum(SettingsEnum)
  @IsNotEmpty()
  @ApiProperty({ required: true })
  key: SettingsEnum;

  @IsOptional()
  @ApiProperty({ required: false })
  value: any;
}