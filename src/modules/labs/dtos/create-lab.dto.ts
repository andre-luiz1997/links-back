import { AddressDTO, type IAddress } from "@shared/address";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import type { ILabs } from "../types/labs";
import { Trim } from "@shared/transformers";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLabDTO implements Omit<ILabs, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty()
  name: string;
  
  @ValidateNested()
  @IsObject()
  @Type(() => AddressDTO)
  @ApiProperty()
  address: IAddress;
  
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  status = true;
}