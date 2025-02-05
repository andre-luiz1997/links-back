import { IPlans } from "../types/plans";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlanDTO implements  Omit<IPlans, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsBoolean()
  isDefault = false;
  @IsOptional()
  @IsBoolean()
  status = true;
}