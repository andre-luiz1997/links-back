import type { IRoles } from "@modules/roles/types/roles";
import { ApiProperty } from "@nestjs/swagger";
import { Types, Schema } from "mongoose"
import { IPermissions } from "src/constants";
export class RolesEntity implements IRoles {
  @ApiProperty()
  name: string;
  @ApiProperty({
    required: false,
  })
  isDefault?: boolean;
  @ApiProperty()
  permissions: IPermissions[];
  @ApiProperty()
  _id: Types.ObjectId;
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
}
export const RolesSchema = new Schema<RolesEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  isDefault: { type: Boolean, required: false, default: false },
  permissions: { type: [], required: true },
}, {
  timestamps: true,
})
