import type { IExamTypes } from "@modules/examTypes/types/examTypes";
import type { ILabs } from "@modules/labs/types/labs";
import type { DBEntity } from "@modules/shared/types";
import type { IUsers } from "@modules/users/types/users";
export interface IExams extends DBEntity {
  user: IUsers;
  examType: IExamTypes;
  date: Date;
  lab?: ILabs;
  /** Method used
   * @example  Contagem Automatizada por Citometria de Fluxo
   */
  method?: string;
  /** Material used
   * @example  Sangue
   */
  material?: string;
}