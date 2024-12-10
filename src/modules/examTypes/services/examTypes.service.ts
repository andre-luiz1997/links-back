import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DefaultService } from '@shared/types';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { ExamTypesEntity } from '../entities/examTypes.entity';
import { CreateExamTypeDTO, UpdateExamTypeDTO } from '../dtos';
import { RecordNotFoundException } from '@shared/exceptions';
import { mapPagination, PaginationProps } from '@shared/pagination';

@Injectable()
export class ExamTypesService implements DefaultService {
  constructor(
    @InjectModel(ProvidersEnum.EXAMTYPES) private examTypesModel: Model<ExamTypesEntity>,
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.examTypesModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  getById(id: string): Promise<ExamTypesEntity> {
    return this.examTypesModel.findById(new Types.ObjectId(id)).exec();
  }

  async getAll(pagination?: PaginationProps) {
    const {query, where} = mapPagination(this.examTypesModel,pagination);

    const records = await query.exec();
    return {
      records,
      totalRecords: await this.examTypesModel.find().countDocuments().exec(),
      filteredRecords: await this.examTypesModel.find(where).countDocuments().exec(),
    };
  }

  async create(body: CreateExamTypeDTO): Promise<ExamTypesEntity> {
    const examType = new this.examTypesModel(body);
    if (await this.exists('name', examType.name)) throw new Error('examType.nameExists');
    if (!examType._id) examType._id = new Types.ObjectId();
    return this.examTypesModel.create(examType);
  }

  async update(id: string, body: UpdateExamTypeDTO): Promise<ExamTypesEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    if (await this.exists('name', body.name, [id])) throw new Error('examType.nameExists');
    return this.examTypesModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string): Promise<ExamTypesEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.examTypesModel.findByIdAndDelete(id);
  }
}