import { Model, PipelineStage, Types } from "mongoose";

export type FilterOperators = 'LIKE' | 'LIKE_ID' | 'NOT LIKE' |
  'GREATER THAN' | 'GREATER THAN OR EQUAL' |
  'LESS THAN' | 'LESS THAN OR EQUAL' |
  'IN' | 'NOT IN' |
  'IS NULL' | 'IS NULL OR NOT EXISTS' | 'IS NOT NULL' |
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

export function mapPagination(model: Model<any>, pagination?: PaginationProps, populate?: PipelineStage.Lookup[]) {
  const where = {};
  const $and = [];
  if (pagination?.filters) {
    pagination.filters.forEach((filter: PaginationFilter) => {
      if (filter.operator === 'LIKE_ID' && typeof filter.value === 'string') {
        where[filter.field] = new Types.ObjectId(filter.value);
      } else if (filter.operator === 'LIKE') {
        where[filter.field] = { $regex: filter.value, $options: 'i' };
      } else if (filter.operator === 'IN') {
        where[filter.field] = { $in: filter.value };
      } else if (filter.operator === 'BETWEEN') {
        where[filter.field] = { $gte: filter.value[0], $lte: filter.value[1] };
      } else if (filter.operator === 'IS NULL OR NOT EXISTS') {
        $and.push({
          $match: {
            $or: [
              { [filter.field]: { $exists: false } },
              { [filter.field]: null }
            ]
          }
        })
      } else {
        where[filter.field] = { [`$${filter.operator.toLowerCase()}`]: filter.value };
      }
    });
  }
  if (Object.keys(where).length) $and.push({
    $match: where
  });
  if (populate) $and.push(...populate);
  if (!$and.length) $and.push({ $match: {} });
  const query = model.aggregate($and);
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
    sortArray.forEach(([key, value]) => {
      query.sort({
        [key]: value
      });
    })
  }
  return { query, where };
}