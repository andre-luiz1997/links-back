import type { DBEntity } from "@modules/shared/types";
export interface IExamTypes extends DBEntity {
  name: string;
  description?: string;
  /** Measurement unit.
   * @example mg/dl
   */
  unit?: string; 
}