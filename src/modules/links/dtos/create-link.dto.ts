import { IUsers } from "@modules/users/types/users";
import { ILinkProfile, ILinks } from "../types/links";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Trim } from "@shared/transformers";
import { Type } from "class-transformer";
import { ILinkItem } from "../types/link-items";
import { ILinkConfiguration } from "../types/link-configuration";
import { LinkConfigurationTheme } from "src/constants";

class LinkProfileDTO implements ILinkProfile {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  show = true;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Trim()
  title?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Trim()
  subtitle?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Trim()
  phone?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Trim()
  phone2?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Trim()
  email?: string;
}

class LinkItemDTO implements ILinkItem {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Trim()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Trim()
  url: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  status = true;
}

class LinkConfigurationDTO implements ILinkConfiguration {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  theme: LinkConfigurationTheme = 'default';
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  main_color?: string
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  secondary_color?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  font_color?: string;
}

export class CreateLinkDTO implements Omit<ILinks, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  user: IUsers;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  status = true;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;
  
  @ApiProperty()
  @Type(() => LinkProfileDTO)
  @IsNotEmpty()
  profile: LinkProfileDTO;

  @ApiProperty()
  @IsOptional()
  @Type(() => LinkItemDTO)
  @IsArray()
  @ValidateNested({ each: true })
  items: LinkItemDTO[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => LinkConfigurationDTO)
  configuration: LinkConfigurationDTO;
}