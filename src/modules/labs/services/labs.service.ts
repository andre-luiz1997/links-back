import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecordNotFoundException } from '@shared/exceptions';
import type { DefaultService } from '@shared/types';
import { Types, type Model } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import type { CreateLabDTO, UpdateLabDTO } from '../dtos';
import type { LabsEntity } from '../entities/labs.entity';
import { mapPagination, PaginationProps } from '@shared/pagination';

@Injectable()
export class LabsService implements DefaultService {
  constructor(
    @InjectModel(ProvidersEnum.LABS) private labsModel: Model<LabsEntity>,
  ) { }

  getById(id: string): Promise<LabsEntity> {
    return this.labsModel.findById(new Types.ObjectId(id)).exec();
  }

  async getAll(pagination: PaginationProps) {
    const {query, where} = mapPagination(this.labsModel,pagination);

    const records = await query.exec();
    return {
      records,
      totalRecords: await this.labsModel.find().countDocuments().exec(),
      filteredRecords: await this.labsModel.find(where).countDocuments().exec(),
    };
  }

  create(body: CreateLabDTO): Promise<LabsEntity> {
    const lab = new this.labsModel(body);
    if (!lab._id) lab._id = new Types.ObjectId();
    return this.labsModel.create(lab);
  }

  async update(id: string, body: UpdateLabDTO): Promise<LabsEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.labsModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string): Promise<LabsEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.labsModel.findByIdAndDelete(id);
  }
}