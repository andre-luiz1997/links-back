import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";
import { IHealthIndicators } from "../types/healthIndicators";
export class HealthIndicatorsEntity implements IHealthIndicators {
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty({
    description: 'Measurement unit.',
    example: 'mg/dl'
  })
  unit?: string;

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

export const HealthIndicatorsSchema = new Schema<HealthIndicatorsEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: false },
  unit: { type: String, required: false },
}, {
  timestamps: true,
})