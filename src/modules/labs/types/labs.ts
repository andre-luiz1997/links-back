import type { DBEntity, IAddress } from "@modules/shared/types";
export interface ILabs extends DBEntity {
  name: string;
  address: IAddress;
  status: boolean;
}