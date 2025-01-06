import { IUsers } from "@modules/users/types/users";
import { Types, Schema } from "mongoose";
import { HealthIndicatorEnum, IHealthIndicator } from "../types/healthIndicator";
import { ApiProperty } from "@nestjs/swagger";
import { ProvidersEnum } from "src/constants";

export class HealthIndicatorsEntity implements IHealthIndicator {
  @ApiProperty({
    enum: HealthIndicatorEnum,
  })
  slug: HealthIndicatorEnum;
  @ApiProperty()
  user: IUsers;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  value: number;
  @ApiProperty()
  _id: Types.ObjectId;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt?: Date;
  @ApiProperty({ required: false })
  deletedAt?: Date;
}

export const HealthIndicatorsSchema = new Schema<HealthIndicatorsEntity>({
  _id: Types.ObjectId,
  slug: { type: String, required: true, enum: HealthIndicatorEnum },
  user: { type: Types.ObjectId, ref: ProvidersEnum.HEALTHINDICATORS, required: true },
  date: { type: Date, required: true },
  value: { type: Number, required: true },
}, {
  timestamps: true,
})