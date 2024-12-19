import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { ReferenceValuesEntity } from '../entities/referenceValues.entity';
import { CreateReferenceValuesDTO, UpdateReferenceValuesDTO } from '../dtos';
import { RecordNotFoundException } from '@shared/exceptions';
import { ExamTypesService } from '@modules/examTypes/services/examTypes.service';
import { mapPagination, PaginationProps } from '@shared/pagination';

@Injectable()
export class ReferenceValuesService {
  constructor(
    @InjectModel(ProvidersEnum.REFERENCEVALUES) private referenceValuesModel: Model<ReferenceValuesEntity>,
    @Inject(forwardRef(() => ExamTypesService)) private examTypesService: ExamTypesService,
  ) { }

  getById(id: string): Promise<ReferenceValuesEntity> {
    return this.referenceValuesModel.findById(new Types.ObjectId(id)).populate('examType').exec();
  }

  async getAll(pagination: PaginationProps) {
    const { query, $and } = mapPagination(this.referenceValuesModel, {
      pagination, populate: [
        {
          $lookup: {
            from: ProvidersEnum.EXAMTYPES.toLowerCase(),
            localField: 'examType',
            foreignField: '_id',
            as: 'examType'
          }
        },
        {
          $unwind: {path: '$examType', preserveNullAndEmptyArrays: true},
          
        }
      ]
    });
    const records = await query.exec();
    return {
      records,
      totalRecords: await this.referenceValuesModel.aggregate([...$and, {
        $count: "total"
      }]).exec()[0]?.total
    };
  }

  async create(body: CreateReferenceValuesDTO): Promise<ReferenceValuesEntity> {
    const lab = new this.referenceValuesModel(body);
    if (!lab._id) lab._id = new Types.ObjectId();
    const examType = this.examTypesService.getById(body.examType);
    if (!examType) throw new RecordNotFoundException('referenceValues.examTypeNotFound');
    const createdRecord = await this.referenceValuesModel.create(lab);
    return this.referenceValuesModel.findById(createdRecord._id).populate('examType').exec();
  }

  async update(id: string, body: UpdateReferenceValuesDTO): Promise<ReferenceValuesEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    const examType = this.examTypesService.getById(body.examType);
    if (!examType) throw new RecordNotFoundException('referenceValues.examTypeNotFound');
    return this.referenceValuesModel.findByIdAndUpdate(id, body, { new: true }).populate('examType').exec();
  }

  async delete(id: string): Promise<ReferenceValuesEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.referenceValuesModel.findByIdAndDelete(id);
  }
}