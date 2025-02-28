import { SettingsEnum } from "src/constants";

export interface IUserSetting {
  key: SettingsEnum | string;
  value: any;
}