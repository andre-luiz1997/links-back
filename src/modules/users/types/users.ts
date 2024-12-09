import { IRoles } from "@modules/roles/types/roles";
import type { DBEntity } from "@modules/shared/types";
export interface IUsers extends DBEntity {
  name: string;
  email: string;
  passwordHash: string;
  status: boolean;
  role?: IRoles;
}