import { IPlans } from "../types/plans";
import { IsBoolean, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from "class-validator";
import { IPlanBilling, PlanFrequencyEnum } from "../types/plans-billing";
import { Type } from "class-transformer";

export class PlanBillingDTO implements IPlanBilling {
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsEnum(PlanFrequencyEnum)
  @IsString()
  frequency: PlanFrequencyEnum;
  @IsNumber()
  @IsOptional()
  trialPeriodDays?: number;
}

export class CreatePlanDTO implements  Omit<IPlans, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNotEmpty()
  @IsNotEmptyObject()
  @Type(() => PlanBillingDTO)
  billing: IPlanBilling;
  @IsOptional()
  @IsBoolean()
  isDefault = false;
  @IsOptional()
  @IsBoolean()
  status = true;
}