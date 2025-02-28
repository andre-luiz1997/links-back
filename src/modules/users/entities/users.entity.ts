import { RolesEntity } from "@modules/roles/entities/roles.entity";
import type { IUsers } from "@modules/users/types/users";
import { Schema, Types } from "mongoose";
import { ProvidersEnum, SettingsEnum } from "src/constants";
import { IUserSetting } from "../types/setting";

export class UsersEntity implements IUsers {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  birthDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  status = true;
  role: RolesEntity;
  settings?: IUserSetting[];
}

export const UserSettingSchema = new Schema<IUserSetting>({
  key: { type: String, enum: SettingsEnum, required: true },
  value: { type: Schema.Types.Mixed, required: false }
}, { _id: false });

export const UsersSchema = new Schema<UsersEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, select: false },
  birthDate: { type: Date, required: false },
  status: { type: Boolean, required: true, default: true },
  role: { type: Types.ObjectId, ref: ProvidersEnum.ROLES, required: true },
  settings: { type: [UserSettingSchema], required: false }
}, {
  timestamps: true,
})