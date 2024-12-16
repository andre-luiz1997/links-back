import type { IExamTypes } from "@modules/examTypes/types/examTypes";
import type { DBEntity } from "@modules/shared/types";

export interface IFastingValues {
  minValue?: number;
  maxValue?: number;
}

export interface IReferenceValues extends DBEntity {
  examType: IExamTypes;
  /** Age Range of value
   * @example Adultos com mais de 20 anos
   */
  ageRange?: string;
  /** Situation
      * @example Com jejum, Sem jejum
      */
  fastingValues?: IFastingValues;
  nonFastingValues?: IFastingValues;
  /** @example Risco baixo, Risco alto */
  category?: string;
  description?: string;
}