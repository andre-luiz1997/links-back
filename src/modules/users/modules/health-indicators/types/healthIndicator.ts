import { IUsers } from "@modules/users/types/users";
import { DBEntity } from "@shared/types";

export enum HealthIndicatorEnum {
  WEIGHT = 'weight',
  BLOOD_PRESSURE = 'blood-pressure',
}

export interface IHealthIndicator extends DBEntity {
  slug: HealthIndicatorEnum;
  user: IUsers;
  date: Date;
  value: number;
}