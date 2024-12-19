import type { DBEntity } from "@modules/shared/types";
import { Types } from "mongoose";

export interface IExamTypesGroup {
  _id: Types.ObjectId;
  /**
   * Name of the group of exams.
   */
  name?: string;
  /**
   * List of examTypes in this group.
   */
  examTypes?: IExamTypes[];
}

export interface IExamTypes extends DBEntity {
  name: string;
  description?: string;
  /** Measurement unit.
   * @example mg/dl
   */
  unit?: string;
  /**
   * Material of the exam.
   * @example Blood
   */
  material?: string;
  /**
  * Method of the exam.
  * @example ELISA
  */
  method?: string;
  /** 
   * Group of exams derived of the main examType
   */
  examTypesGroups?: IExamTypesGroup[];
  /**
   * Parent groups of this examType.
   */
  parentGroups?: Types.ObjectId[]; 
}