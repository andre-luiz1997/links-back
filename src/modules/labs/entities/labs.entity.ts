import type { ILabs } from "@modules/labs/types/labs";
import { ApiProperty } from "@nestjs/swagger";
import type { IAddress } from "@shared/address";
import { Schema, Types } from "mongoose";
export class LabsEntity implements ILabs {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: IAddress;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({
    required: false
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false
  })
  deletedAt?: Date;
}
export const LabsSchema = new Schema<LabsEntity>({
  _id: Types.ObjectId,
  name: {type: String, required: true},
  address: {type: Object, required: true},
  status: {type: Boolean, required: true, default: true},
}, {
  timestamps: true
})