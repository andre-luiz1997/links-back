import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { UsersEntity } from '../entities/users.entity';
import { RecordNotFoundException } from '@shared/exceptions';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ProvidersEnum.USERS) private usersModel: Model<UsersEntity>,
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.usersModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  getById(id: string): Promise<UsersEntity> {
    return this.usersModel.findById(new Types.ObjectId(id)).exec();
  }

  getOne(where: any, withPassword?: boolean): Promise<UsersEntity | undefined> {
    if(withPassword) return this.usersModel.findOne(where).select('+passwordHash').exec();
    return this.usersModel.findOne(where).exec();
  }

  getAll(): Promise<UsersEntity[]> {
    return this.usersModel.find().exec();
  }

  async create(body: CreateUserDTO): Promise<UsersEntity> {
    const record = new this.usersModel(body);
    if (await this.exists('email', record.email)) throw new Error('user.emailExists');
    if (!record._id) record._id = new Types.ObjectId();
    record.passwordHash = await bcrypt.hash(body.password, 10);
    return this.usersModel.create(record);
  }

  async update(id: string, body: UpdateUserDTO): Promise<UsersEntity> {
    let record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    if (await this.exists('email', body.email, [id])) throw new Error('user.emailExists');
    record = new this.usersModel(body);
    record._id = new Types.ObjectId(id);
    if (body.password) {
      record.passwordHash = await bcrypt.hash(body.password, 10);
    }
    body.password = undefined;
    return this.usersModel.findByIdAndUpdate(id, record, { new: true });
  }

  async delete(id: string): Promise<UsersEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.usersModel.findByIdAndDelete(id);
  }
}