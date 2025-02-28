import type { IRoles } from "@modules/roles/types/roles";
import { Types, Schema } from "mongoose"
import { IPermissions } from "src/constants";
export class RolesEntity implements IRoles {
  name: string;
  isDefault?: boolean;
  permissions: IPermissions[];
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export const RolesSchema = new Schema<RolesEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  isDefault: { type: Boolean, required: false, default: false },
  permissions: { type: [], required: true },
}, {
  timestamps: true,
})
