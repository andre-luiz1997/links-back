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

export class ResponseFactory<T = any> implements DefaultResponse<T> {
  message?: string;
  data: T;
  private constructor(data: T | undefined | null, message?: string) {
    this.data = data;
    this.message = message;
  }

  static build<T>(data: T | undefined | null, message?: string) {
    return new ResponseFactory<T>(data, message);
  }

  setData(data: T) {
    this.data = data;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }
}