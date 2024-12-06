import type { DBEntity } from "@modules/shared/types";
export interface IRoles extends DBEntity {
  name: string;
  isDefault?: boolean;
  permissions: string[];
}