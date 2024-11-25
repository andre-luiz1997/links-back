import type { IResults } from "@modules/results/types/results";
import { type IProvider, ProvidersEnum } from "@shared/providers";
import {Types,Schema} from "mongoose"
export class ResultsEntity implements IResults {}
export const ResultsSchema = new Schema<ResultsEntity>({
_id: Types.ObjectId,
})
export const ResultsProvider: IProvider = {
name: ProvidersEnum.RESULTS,
schema: ResultsSchema
}