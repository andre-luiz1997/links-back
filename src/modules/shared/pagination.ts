import { Model } from "mongoose";

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

export function mapPagination(model: Model<any>, pagination?: PaginationProps) {
  const where = {};
  if (pagination?.filters) {
    pagination.filters.forEach((filter: PaginationFilter) => {
      if (filter.operator === 'LIKE') {
        where[filter.field] = { $regex: filter.value, $options: 'i' };
      } else if (filter.operator === 'IN') {
        where[filter.field] = { $in: filter.value };
      } else if (filter.operator === 'BETWEEN') {
        where[filter.field] = { $gte: filter.value[0], $lte: filter.value[1] };
      } else {
        where[filter.field] = { [`$${filter.operator.toLowerCase()}`]: filter.value };
      }
    });
  }
  const query = model.find();
  if (pagination?.limit) query.limit(pagination.limit);
  if (pagination?.skip) query.skip(pagination.skip);
  if (pagination?.sortBy) {
    const sortArray = [];
    if (Array.isArray(pagination.sortBy)) {
      pagination.sortBy.forEach((field) => {
        const sort = pagination.sortOrder == 1 ? 'asc' : 'desc';
        sortArray.push([field, sort]);
      });
    } else {
      const sort = pagination.sortOrder == 1 ? 'asc' : 'desc';
      sortArray.push([pagination.sortBy, sort]);
    }
    query.sort(sortArray);
  }
  return { query, where };
}