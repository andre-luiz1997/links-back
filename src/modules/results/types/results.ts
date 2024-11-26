import type { IExams } from "@modules/exams/types/exams";
import { IExamTypes } from "@modules/examTypes/types/examTypes";
import type { DBEntity } from "@modules/shared/types";
export interface IResults extends DBEntity {
  exam: IExams;
  examType: IExamTypes;
  parameter: string;
  value: number;
  unit?: string;
  observations?: string;
  /** Method used
     * @example  Contagem Automatizada por Citometria de Fluxo
     */
  method?: string;
  /** Material used
   * @example  Sangue
   */
  material?: string;
}