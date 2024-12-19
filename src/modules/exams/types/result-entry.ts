import { IExamTypes } from "@modules/examTypes/types/examTypes";

export interface IResultEntry {
  examType: IExamTypes;
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
  entryGroups?: IResultEntry[];
}