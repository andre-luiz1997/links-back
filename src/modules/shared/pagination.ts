import { Model, PipelineStage, Types } from "mongoose";
import { configureDayjs } from "./functions";
const dayjs = configureDayjs();

export type FilterOperators = 'LIKE' | 'LIKE_ID' | 'NOT LIKE' |
  'GREATER THAN' | 'GREATER THAN OR EQUAL' |
  'LESS THAN' | 'LESS THAN OR EQUAL' |
  'IN' | 'NOT IN' | 'IS' | 'IS NOT' |
  'IS NULL' | 'IS NULL OR NOT EXISTS' | 'IS NOT NULL' |
  'BETWEEN' | '%%' | '%_' | '_%';

export interface PaginationFilter {
  field: string;
  value?: string | string[] | number | number[] | Date | Date[] | Types.ObjectId | Types.ObjectId[];
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

const datableFields = ['createdAt', 'updatedAt', 'deletedAt', 'date', 'start', 'end', 'dateOfBirth']

export function mapPagination(model: Model<any>, options?: { pagination?: PaginationProps, populate?: PipelineStage[] }) {
  const { pagination, populate } = options;
  const where = {};
  const $and = [];
  if (pagination?.filters) {
    pagination.filters.forEach((filter: PaginationFilter) => {
      if (filter.operator === 'LIKE_ID' && typeof filter.value === 'string') {
        where[filter.field] = new Types.ObjectId(filter.value);
      } else if (filter.operator === 'IS') {
        where[filter.field] = filter.value;
      } else if (filter.operator === 'IS NOT') {
        where[filter.field] = { $not: filter.value };
      } else if (filter.operator === 'LIKE' || filter.operator === '%%') {
        where[filter.field] = { $regex: filter.value, $options: 'i' };
      } else if (filter.operator === 'IN') {
        where[filter.field] = { $in: filter.value };
      } else if (filter.operator === 'BETWEEN') {
        if(datableFields.includes(filter.field)) {
          where[filter.field] = { $gte: dayjs(filter.value[0]).toDate(), $lte: dayjs(filter.value[1]).toDate() };
        } else {
          where[filter.field] = { $gte: filter.value[0], $lte: filter.value[1] };
        }
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
  const limits = [];
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
      let sort = value;
      if (value === 'asc') sort = 1;
      else if (value === 'desc') sort = -1;
      limits.push({ $sort: { [key]: sort } });
    })
  }
  if (pagination?.skip) limits.push({ $skip: pagination.skip });
  if (pagination?.limit) limits.push({ $limit: pagination.limit });
  const query = model.aggregate([...$and, ...limits]);
  return { query, $and };
}