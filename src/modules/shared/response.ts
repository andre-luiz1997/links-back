export interface DefaultResponse<T> {
  message?: string;
  data: T;
}

export interface PaginatedResult<T> {
  /** Records filtered and paginated in this database within account */
  records: Array<T>;
  /** Total count of records in this database within account */
  totalRecords: number;
  /** Total count of filtered records in this database within account */
  filteredRecords: number;
  summary?: any
}

export interface DefaultPaginatedResponse<T>
  extends DefaultResponse<PaginatedResult<T>> { }
