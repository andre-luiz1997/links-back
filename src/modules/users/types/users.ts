import { IRoles } from "@modules/roles/types/roles";
import type { DBEntity } from "@modules/shared/types";
import { IUserSetting } from "./setting";
export interface IUsers extends DBEntity {
  name: string;
  email: string;
  birthDate?: Date;
  passwordHash: string;
  status: boolean;
  role?: IRoles;
  settings?: IUserSetting[];
}