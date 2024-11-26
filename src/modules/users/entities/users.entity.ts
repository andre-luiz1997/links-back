import type { IUsers } from "@modules/users/types/users";
import { ApiProperty } from "@nestjs/swagger";
import { Schema, Types } from "mongoose";

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
}

export const UsersSchema = new Schema<UsersEntity>({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, select: false },
  status: { type: Boolean, required: true, default: true },
}, {
  timestamps: true,
})