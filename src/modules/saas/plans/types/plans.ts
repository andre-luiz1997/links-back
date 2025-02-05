import { DBEntity } from "@shared/types";

export interface IPlans extends DBEntity {
  name: string;
  description?: string;
  price: number;
  isDefault: boolean;
  status: boolean;
}