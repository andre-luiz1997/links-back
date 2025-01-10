import { IUsers } from "@modules/users/types/users";
import { DBEntity } from "@shared/types";

export enum HealthIndicatorEnum {
  WEIGHT = 'weight',
  BLOOD_PRESSURE = 'blood-pressure',
  CALORIES = 'calories',
  SLEEPING_HOURS = 'sleeping-hours',
}

export interface IHealthIndicator extends DBEntity {
  slug: HealthIndicatorEnum;
  user: IUsers;
  date: Date;
  value: number;
}