import type { IFiles } from "@modules/files/types/files";
import mongoose, { Schema } from "mongoose"

export class FilesEntity implements IFiles {
  _id: mongoose.Types.ObjectId;
  name: string;
  originalName: string;
  path: string;
  model?: string;
  modelId?: mongoose.Types.ObjectId;
  key?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const FilesSchema = new Schema<FilesEntity>({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true, default: 'resources/temp' },
  model: { type: String, required: false },
  // @ts-ignore
  modelId: { type: mongoose.Types.ObjectId, required: false },
  key: { type: String, required: false },
  createdDate: { type: Date, required: false },
}, {
  timestamps: true,
})
