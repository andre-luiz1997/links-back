import type { ILabs } from "@modules/labs/types/labs";
import { type IProvider, ProvidersEnum } from "@shared/providers";
import {Types,Schema} from "mongoose"
export class LabsEntity implements ILabs {}
export const LabsSchema = new Schema<LabsEntity>({
_id: Types.ObjectId,
})
export const LabsProvider: IProvider = {
name: ProvidersEnum.LABS,
schema: LabsSchema
}