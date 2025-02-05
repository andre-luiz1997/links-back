import { Schema, Types } from "mongoose";
import { IPlans } from "../types/plans";
import { ApiProperty } from "@nestjs/swagger";

export class PlansEntity implements IPlans {
  @ApiProperty()
  name: string;
  @ApiProperty({
    required: false
  })
  description?: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  isDefault: boolean;
  @ApiProperty()
  _id: Types.ObjectId;
  createdAt: Date;
  @ApiProperty({
    required: false
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false
  })
  deletedAt?: Date;
  @ApiProperty()
  status: boolean;
}


export const PlansSchema = new Schema<PlansEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  isDefault: { type: Boolean, required: true, default: false },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: true,
})