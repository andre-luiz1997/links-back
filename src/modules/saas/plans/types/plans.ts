import { DBEntity } from "@shared/types";
import { IPlanBilling } from "./plans-billing";

export interface IPlans extends DBEntity {
  name: string;
  description?: string;
  billing: IPlanBilling;
  isDefault: boolean;
  status: boolean;
}