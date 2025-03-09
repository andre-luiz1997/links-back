import type { DBEntity } from "@modules/shared/types";
import mongoose from "mongoose";

export interface IFiles extends DBEntity {
  name: string;
  originalName: string;
  path: string;
  model?: string;
  modelId?: mongoose.Types.ObjectId;
  key?: string;
}