import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DefaultService } from '@shared/types';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { RecordNotFoundException } from '@shared/exceptions';
import { mapPagination, PaginationProps } from '@shared/pagination';
import { HealthIndicatorsEntity } from '../entities/examTypes.entity';
import { CreateHealthIndicatorDTO, UpdateHealthIndicatorDTO } from '../dtos';

@Injectable()
export class HealthIndicatorsService implements DefaultService {
  constructor(
    @InjectModel(ProvidersEnum.HEALTHINDICATORS) private healthIndicatorsModel: Model<HealthIndicatorsEntity>,
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.healthIndicatorsModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  existsAnd(props: { prop: string, value: any, ignoreIds: string[] }[]) {
    return this.healthIndicatorsModel.exists({ $and: props.map(({ prop, value, ignoreIds }) => ({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } })) });
  }

  getById(id: string): Promise<HealthIndicatorsEntity> {
    return this.healthIndicatorsModel.findById(new Types.ObjectId(id)).populate({
      path: 'examTypesGroups',
      populate: {
        path: 'examTypes'
      }
    }).exec();
  }

  async getAll(pagination?: PaginationProps) {
    const { query, $and } = mapPagination(this.healthIndicatorsModel, { pagination });
    const records = await query.exec();
    return {
      records,
      totalRecords: (await this.healthIndicatorsModel.aggregate([...$and, {
        $count: "total"
      }]).exec())[0]?.total ?? 0
    };
  }

  async create(body: CreateHealthIndicatorDTO): Promise<HealthIndicatorsEntity> {
    const healthIndicator = new this.healthIndicatorsModel(body);
    if (await this.exists('name', body.name)) throw new Error('healthIndicator.nameExists');
    if (!healthIndicator._id) healthIndicator._id = new Types.ObjectId();
    const record = await this.healthIndicatorsModel.create(healthIndicator);
    await record.save();
    return record;
  }

  async update(id: string, body: UpdateHealthIndicatorDTO): Promise<HealthIndicatorsEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    if (await this.exists('name', body.name, [id])) throw new Error('examType.nameExists');
    return this.healthIndicatorsModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string): Promise<HealthIndicatorsEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.healthIndicatorsModel.findByIdAndDelete(id);
  }
}