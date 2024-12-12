import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RemoveNonNumeric, Trim } from "./transformers";

export interface IAddress {
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export class AddressDTO implements IAddress {
  @IsString()
  @IsNotEmpty()
  @Trim()
  street: string;
  @IsString()
  @IsNotEmpty()
  number: string;
  @IsString()
  @IsOptional()
  @Trim()
  complement?: string;
  @IsString()
  @IsNotEmpty()
  @Trim()
  neighborhood: string;
  @IsString()
  @IsNotEmpty()
  @Trim()
  city: string;
  @IsString()
  @IsNotEmpty()
  @Trim()
  state: string;
  @IsString()
  @IsNotEmpty()
  @Trim()
  country: string;
  @IsString()
  @IsNotEmpty()
  @Trim()
  @RemoveNonNumeric()
  zipCode: string;
}