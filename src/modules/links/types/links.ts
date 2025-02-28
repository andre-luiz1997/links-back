import type { DBEntity } from "@modules/shared/types";
import { IUsers } from "@modules/users/types/users";
import { ILinkItem } from "./link-items";
import { ILinkConfiguration } from "./link-configuration";

export interface ILinkProfile {
  show: boolean;
  title?: string;
  subtitle?: string;
  phone?: string;
  phone2?: string;
  email?: string;
}

export interface ILinks extends DBEntity {
  user: IUsers;
  status: boolean;
  title?: string;
  items?: ILinkItem[];
  configuration: ILinkConfiguration;
  profile: ILinkProfile;
}