import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { HealthIndicatorsEntity } from './entities/healthIndicators.entity';
import { UsersService } from '@modules/users/services/users.service';
import { CreateHealthIndicatorDTO, UpdateHealthIndicatorDTO } from './dtos';
import { RecordNotFoundException } from '@shared/exceptions';
import { mapPagination, PaginationProps } from '@shared/pagination';

@Injectable()
export class HealthIndicatorsService {
  constructor(
    @InjectModel(ProvidersEnum.HEALTHINDICATORS) private healthIndicatorsModel: Model<HealthIndicatorsEntity>,
    @Inject(UsersService) private usersService: UsersService
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.healthIndicatorsModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  getById(id: string): Promise<HealthIndicatorsEntity> {
    return this.healthIndicatorsModel.findById(new Types.ObjectId(id)).populate('user').exec();
  }

  getOne(where: any, withPassword?: boolean): Promise<HealthIndicatorsEntity | undefined> {
    if (withPassword) return this.healthIndicatorsModel.findOne(where).populate('user').exec();
    return this.healthIndicatorsModel.findOne(where).populate('user').exec();
  }

  async getAll(pagination?: PaginationProps) {
    const { query, $and } = mapPagination(this.healthIndicatorsModel, {
      pagination
    });
    const records = await query.exec();
    return {
      records,
      totalRecords: (await this.healthIndicatorsModel.aggregate([...$and, {
        $count: "total"
      }]).exec())?.[0]?.total,
    };
  }

  async create(body: CreateHealthIndicatorDTO): Promise<HealthIndicatorsEntity> {
    const record = new this.healthIndicatorsModel(body);
    if (!record._id) record._id = new Types.ObjectId();
    const user = await this.usersService.getById(body.user);
    if (!user) throw new RecordNotFoundException('healthIndicators.userNotFound');
    record.user = user;
    return (await this.healthIndicatorsModel.create(record));
  }

  async update(id: string, body: UpdateHealthIndicatorDTO): Promise<HealthIndicatorsEntity> {
    let record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    record = new this.healthIndicatorsModel(body);
    record._id = new Types.ObjectId(id);
    if (body.user) {
      const user = await this.usersService.getById(body.user);
      if (!user) throw new RecordNotFoundException('healthIndicators.userNotFound');
      record.user = user;
    }
    return this.healthIndicatorsModel.findByIdAndUpdate(id, record, { new: true });
  }

  async delete(id: string): Promise<HealthIndicatorsEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.healthIndicatorsModel.findByIdAndDelete(id);
  }
}
