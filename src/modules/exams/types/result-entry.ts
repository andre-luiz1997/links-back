import { IExamTypes } from "@modules/examTypes/types/examTypes";

export interface IResultEntry {
  examType: IExamTypes;
  value?: number;
  unit?: string;
  observations?: string;
  entryGroups?: IResultEntry[];
}