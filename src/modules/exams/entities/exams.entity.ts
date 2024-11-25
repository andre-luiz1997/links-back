import type { IExams } from "@modules/exams/types/exams";
import { type IProvider, ProvidersEnum } from "@shared/providers";
import {Types,Schema} from "mongoose"
export class ExamsEntity implements IExams {}
export const ExamsSchema = new Schema<ExamsEntity>({
_id: Types.ObjectId,
})
export const ExamsProvider: IProvider = {
name: ProvidersEnum.EXAMS,
schema: ExamsSchema
}