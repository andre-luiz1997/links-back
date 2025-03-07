import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProvidersEnum, SettingsEnum } from 'src/constants';
import { UsersEntity } from '../entities/users.entity';
import { RecordNotFoundException } from '@shared/exceptions';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import * as bcrypt from 'bcrypt';
import { RolesEntity } from '@modules/roles/entities/roles.entity';
import { RolesService } from '@modules/roles/services/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ProvidersEnum.USERS) private usersModel: Model<UsersEntity>,
    @Inject(RolesService) private rolesService: RolesService
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.usersModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  getById(id: string): Promise<UsersEntity> {
    return this.usersModel.findById(new Types.ObjectId(id)).populate('role').exec();
  }

  getOne(where: any, withPassword?: boolean): Promise<UsersEntity | undefined> {
    if (withPassword) return this.usersModel.findOne(where).populate('role').select('+passwordHash').exec();
    return this.usersModel.findOne(where).populate('role').exec();
  }

  getAll(): Promise<UsersEntity[]> {
    return this.usersModel.find().exec();
  }

  async create(body: CreateUserDTO): Promise<UsersEntity> {
    let role: RolesEntity;
    if (body.role) role = await this.rolesService.getById(body.role);
    else role = await this.rolesService.getOne({ isDefault: true });
    const record = new this.usersModel({ ...body, role });
    if (await this.exists('email', record.email)) throw new Error('user.emailExists');
    if (!record._id) record._id = new Types.ObjectId();
    record.passwordHash = await bcrypt.hash(body.password, 10);
    return (await this.usersModel.create(record)).populate('role');
  }

  async updateSetting(userId: string, key: SettingsEnum, value: any) {
    const user = await this.getById(userId);
    if (!user) throw new RecordNotFoundException();
    user.settings = user.settings || [];
    const setting = user.settings.find(s => s.key === key);
    if (setting) setting.value = value;
    else user.settings.push({ key, value });
    return this.usersModel.findByIdAndUpdate(userId, {
      $set: { settings: user.settings },
    }, { new: true }).populate('role').exec();
  }

  async update(id: string, body: UpdateUserDTO): Promise<UsersEntity> {
    if (!await this.getById(id)) throw new RecordNotFoundException();
    if (await this.exists('email', body.email, [id])) throw new Error('user.emailExists');
    const $set: any = { ...body };
    if (body.password) {
      $set.passwordHash = await bcrypt.hash(body.password, 10);
    }
    $set.password = undefined;
    return this.usersModel.findByIdAndUpdate(id, {
      $set,
    }, { new: true }).populate('role').exec();
  }

  async delete(id: string): Promise<UsersEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.usersModel.findByIdAndDelete(id);
  }
}