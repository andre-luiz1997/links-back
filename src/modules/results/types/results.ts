import type { IExams } from "@modules/exams/types/exams";
import type { DBEntity } from "@modules/shared/types";
export interface IResults extends DBEntity {
  exam: IExams;
  parameter: string;
  value: number;
  unit?: string;
  observations?: string;
}