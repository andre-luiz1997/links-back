import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { HealthIndicatorEnum, IHealthIndicator } from "../types/healthIndicator";

export class CreateHealthIndicatorDTO implements Omit<IHealthIndicator,'_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'> {
  @IsNotEmpty()
  @IsString()
  @IsEnum(HealthIndicatorEnum)
  slug: HealthIndicatorEnum;
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  value: number;
  user: string;
}