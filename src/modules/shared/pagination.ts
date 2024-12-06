export type FilterOperators = 'LIKE' | 'NOT LIKE' | 
'GREATER THAN' | 'GREATER THAN OR EQUAL' | 
'LESS THAN' | 'LESS THAN OR EQUAL' |
'IN' | 'NOT IN' | 
'IS NULL' | 'IS NOT NULL' |
'BETWEEN' | '%%' | '%_' | '_%';

export interface PaginationFilter {
  field: string;
  value: string | string[] | number | number[] | Date | Date[];
  operator: FilterOperators;
}

export type SortOrder = -1 | 1;

export interface PaginationProps {
  skip?: number;
  limit?: number;
  sortBy?: string | string[];
  sortOrder?: SortOrder | SortOrder[];
  filters?: PaginationFilter[];
}