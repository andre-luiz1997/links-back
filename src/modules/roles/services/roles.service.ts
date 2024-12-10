import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RolesEntity } from '../entities/roles.entity';
import { Model, Types } from 'mongoose';
import { PERMISSIONS, ProvidersEnum } from 'src/constants';
import { CreateRoleDTO } from '../dtos/create-role.dto';
import { UpdateRoleDTO } from '../dtos/update-role.dto';
import { RecordNotFoundException } from '@shared/exceptions';
import { mapPagination, PaginationProps } from '@shared/pagination';
import { PaginatedResult } from '@shared/response';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RolesService {
  $role = new BehaviorSubject<RolesEntity | undefined>(undefined);
  
  constructor(
    @InjectModel(ProvidersEnum.ROLES) private rolesModel: Model<RolesEntity>,
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.rolesModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  getById(id: string): Promise<RolesEntity> {
    return this.rolesModel.findById(new Types.ObjectId(id)).exec();
  }

  getOne(where: any): Promise<RolesEntity | undefined> {
    return this.rolesModel.findOne(where).exec();
  }

  async getAll(pagination?: PaginationProps): Promise<PaginatedResult<RolesEntity[]>> {
    const {query, where} = mapPagination(this.rolesModel,pagination);

    const records = await query.exec();
    return {
      records,
      totalRecords: await this.rolesModel.find().countDocuments().exec(),
      filteredRecords: await this.rolesModel.find(where).countDocuments().exec(),
    };
  }

  async create(body: CreateRoleDTO): Promise<RolesEntity> {
    const record = new this.rolesModel(body);
    if (!record._id) record._id = new Types.ObjectId();
    if(await this.exists('name', record.name)) throw new Error('role.nameExists');
    return this.rolesModel.create(record);
  }

  async update(id: string, body: UpdateRoleDTO): Promise<RolesEntity> {
    let record = await this.getById(id);
    if (!record) throw new Error('role.notFound');
    if (await this.exists('name', body.name, [id])) throw new Error('role.nameExists');
    record = new this.rolesModel(body);
    record._id = new Types.ObjectId(id);
    return this.rolesModel.findByIdAndUpdate(id, record, { new: true });
  }

  async delete(id: string): Promise<RolesEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.rolesModel.findByIdAndDelete(id);
  }

  async getPermissions() {
    return PERMISSIONS;
  }
}