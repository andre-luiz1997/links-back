import type { IReferenceValues } from "@modules/referenceValues/types/referenceValues";
import { type IProvider, ProvidersEnum } from "@shared/providers";
import {Types,Schema} from "mongoose"
export class ReferenceValuesEntity implements IReferenceValues {}
export const ReferenceValuesSchema = new Schema<ReferenceValuesEntity>({
_id: Types.ObjectId,
})
export const ReferenceValuesProvider: IProvider = {
name: ProvidersEnum.REFERENCEVALUES,
schema: ReferenceValuesSchema
}