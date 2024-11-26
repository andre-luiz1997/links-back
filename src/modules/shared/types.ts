import { IUsers } from "@modules/users/types/users";
import { Request } from "express";
import type { Types } from "mongoose";

export interface DBEntity {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DefaultService {
  getById(id: string): Promise<DBEntity>;
  getAll(): Promise<DBEntity[]>;
  create(body: any): Promise<DBEntity>;
  update(id: string, body: any): Promise<DBEntity>;
  delete(id: string): Promise<DBEntity>;
}

export interface CustomRequest extends Request {
  user: IUsers;
}

export * from './address';
