import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { PlansEntity } from '../entities/plans.entity';
import { DBEntity, DefaultService } from '@shared/types';
import { mapPagination, PaginationProps } from '@shared/pagination';
import { CreatePlanDTO } from '../dtos';
import { RecordNotFoundException } from '@shared/exceptions';

@Injectable()
export class PlansService implements DefaultService {
  constructor(
    @InjectModel(ProvidersEnum.PLANS) private plansModel: Model<PlansEntity>,
  ) { }

  getById(id: string): Promise<PlansEntity> {
    return this.plansModel.findById(new Types.ObjectId(id)).exec();
  }

  async getAll(pagination?: PaginationProps): Promise<any> {
    const { query, $and } = mapPagination(this.plansModel, { pagination });

    const records = await query.exec();
    return {
      records,
      totalRecords: await this.plansModel.aggregate([...$and, {
        $count: "total"
      }]).exec()[0]?.total,
    };
  }

  async create(body: CreatePlanDTO): Promise<DBEntity> {
    const plan = new this.plansModel(body);
    if (!plan._id) plan._id = new Types.ObjectId();
    const createdRecord = await this.plansModel.create(plan);
    if (plan.isDefault) {
      await this.plansModel.updateMany({ _id: { $ne: plan._id } }, { isDefault: false });
    }
    return createdRecord;
  }

  async update(id: string, body: any): Promise<DBEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    const updatedRecord = await this.plansModel.findByIdAndUpdate(record._id, body, { new: true });
    if (body.isDefault) {
      await this.plansModel.updateMany({ _id: { $ne: record._id } }, { isDefault: false });
    }
    return updatedRecord;
  }

  async delete(id: string): Promise<DBEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.plansModel.findByIdAndDelete(id);
  }

}
