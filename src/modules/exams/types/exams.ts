import type { ILabs } from "@modules/labs/types/labs";
import type { DBEntity } from "@modules/shared/types";
import type { IUsers } from "@modules/users/types/users";
import { IResultEntry } from "./result-entry";
export interface IExams extends DBEntity {
  user: IUsers;
  date: Date;
  lab?: ILabs;
  results: IResultEntry[];
}