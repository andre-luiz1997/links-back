import { Schema, Types } from "mongoose";
import { IPlans } from "../types/plans";
import { ApiProperty } from "@nestjs/swagger";
import { IPlanBilling, PlanFrequencyEnum } from "../types/plans-billing";


export class PlansEntity implements IPlans {
  @ApiProperty()
  name: string;
  @ApiProperty({
    required: false
  })
  description?: string;
  @ApiProperty()
  billing: IPlanBilling;
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

export const PlanBillingSchema =  new Schema<IPlanBilling>({
  price: { type: Number, required: true },
  frequency: { type: String, required: true, enum: PlanFrequencyEnum },
  trialPeriodDays: { type: Number, required: false }
});

export const PlansSchema = new Schema<PlansEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: false },
  billing: { type: PlanBillingSchema, required: true },
  isDefault: { type: Boolean, required: true, default: false },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: true,
})