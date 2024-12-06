import { IUsers } from "@modules/users/types/users";
import { Request } from "express";
import type { Types } from "mongoose";
import { PaginationProps } from "./pagination";
import { PaginatedResult } from "./response";

export interface DBEntity {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DefaultService {
  getById(id: string): Promise<DBEntity>;
  getAll(paginationProps?: PaginationProps): Promise<any>;
  // getAll(paginationProps?: PaginationProps): Promise<PaginatedResult<DBEntity>>;
  create(body: any): Promise<DBEntity>;
  update(id: string, body: any): Promise<DBEntity>;
  delete(id: string): Promise<DBEntity>;
}

export interface CustomRequest extends Request {
  user: IUsers;
}

export * from './address';
