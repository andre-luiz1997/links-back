import type { IExamTypes } from "@modules/examTypes/types/examTypes";
import { type IProvider, ProvidersEnum } from "@shared/providers";
import {Types,Schema} from "mongoose"
export class ExamTypesEntity implements IExamTypes {}
export const ExamTypesSchema = new Schema<ExamTypesEntity>({
_id: Types.ObjectId,
})
export const ExamTypesProvider: IProvider = {
name: ProvidersEnum.EXAMTYPES,
schema: ExamTypesSchema
}