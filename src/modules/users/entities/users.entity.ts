import { RolesEntity } from "@modules/roles/entities/roles.entity";
import type { IUsers } from "@modules/users/types/users";
import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";
import { ProvidersEnum } from "src/constants";
import { IUserSetting } from "../types/setting";

export class UsersEntity implements IUsers {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  passwordHash: string;
  @ApiProperty()
  birthDate?: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({
    required: false,
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false,
  })
  deletedAt?: Date;
  @ApiProperty({
    required: false,
  })
  status = true;
  @ApiProperty({
    required: true
  })
  role: RolesEntity;
  @ApiProperty({
    required: false
  })
  settings?: IUserSetting[];
}

export const UserSettingSchema = new Schema<IUserSetting>({
  key: { type: String, required: true },
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