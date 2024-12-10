import type { DBEntity } from "@modules/shared/types";
import { IPermissions } from "src/constants";
export interface IRoles extends DBEntity {
  name: string;
  isDefault?: boolean;
  permissions: IPermissions[];
}