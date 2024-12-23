import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DefaultService } from '@shared/types';
import { Model, PipelineStage, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { ExamTypesEntity } from '../entities/examTypes.entity';
import { CreateExamTypeDTO, UpdateExamTypeDTO } from '../dtos';
import { RecordNotFoundException } from '@shared/exceptions';
import { mapPagination, PaginationProps } from '@shared/pagination';
import { isEmpty } from 'class-validator';
import { IExamTypes, IExamTypesGroup } from '../types/examTypes';

@Injectable()
export class ExamTypesService implements DefaultService {
  constructor(
    @InjectModel(ProvidersEnum.EXAMTYPES) private examTypesModel: Model<ExamTypesEntity>,
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.examTypesModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  existsAnd(props: { prop: string, value: any, ignoreIds: string[] }[]) {
    return this.examTypesModel.exists({ $and: props.map(({ prop, value, ignoreIds }) => ({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } })) });
  }

  getById(id: string): Promise<ExamTypesEntity> {
    return this.examTypesModel.findById(new Types.ObjectId(id)).populate({
      path: 'examTypesGroups',
      populate: {
        path: 'examTypes'
      }
    }).exec();
  }

  private async prepareExamTypesGroups(examTypesGroups: IExamTypesGroup[], parentId?: string): Promise<IExamTypesGroup[]> {
    if (!examTypesGroups) return;

    return Promise.all(examTypesGroups.map(async group => {
      return {
        _id: group._id ?? new Types.ObjectId(),
        name: group.name,
        examTypes: await Promise.all(group.examTypes?.map(async _examType => {
          let examType: IExamTypes;
          if (!isEmpty(_examType._id)) {
            examType = await this.examTypesModel.findOne({ _id: _examType._id });
          } else if (!isEmpty(_examType.name)) {
            examType = await this.examTypesModel.findOne({ name: _examType.name });
          }
          if (!examType) {
            _examType.parentGroups ??= [];
            if (parentId && !_examType.parentGroups.includes(new Types.ObjectId(parentId))) _examType.parentGroups.push(new Types.ObjectId(parentId));
            examType = await this.create(_examType);
          } else if (parentId) {
            examType.parentGroups ??= [];
            if (!examType.parentGroups.includes(new Types.ObjectId(parentId))) {
              examType.parentGroups.push(new Types.ObjectId(parentId));
            }
            examType = await this.update(examType._id.toString(), examType);
          }
          return examType;
        })),
      }
    }))
  }

  private getExamTypesGroupsPopulate(): PipelineStage[] {
    return [{
      $lookup: {
        from: "examtypes",
        localField: "examTypesGroups.examTypes",
        foreignField: "_id",
        as: "resolvedExamTypes"
      }
    },
    {
      $addFields: {
        examTypesGroups: {
          $map: {
            input: "$examTypesGroups",
            as: "group",
            in: {
              _id: "$$group._id",
              name: "$$group.name",
              examTypes: {
                $filter: {
                  input: "$resolvedExamTypes",
                  as: "examType",
                  cond: {
                    $in: [
                      "$$examType._id",
                      "$$group.examTypes"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      $project: {
        resolvedExamTypes: 0
      }
    }]
  }

  async getAll(pagination?: PaginationProps) {
    const { query, $and } = mapPagination(this.examTypesModel, { pagination, populate: this.getExamTypesGroupsPopulate() });
    const records = await query.exec();
    return {
      records,
      totalRecords: (await this.examTypesModel.aggregate([...$and, {
        $count: "total"
      }]).exec())[0]?.total ?? 0
    };
  }

  async create(body: CreateExamTypeDTO): Promise<ExamTypesEntity> {
    const examTypesGroups = body.examTypesGroups;
    body.examTypesGroups = undefined;
    const examType = new this.examTypesModel(body);
    if (await this.exists('name', body.name)) throw new Error('examType.nameExists');
    if (!examType._id) examType._id = new Types.ObjectId();
    const record = await this.examTypesModel.create(examType);
    record.examTypesGroups = await this.prepareExamTypesGroups(examTypesGroups, record._id.toString());
    if (!record.parentGroups?.length) record.parentGroups = undefined;
    await record.save();
    return record;
  }

  async update(id: string, body: UpdateExamTypeDTO): Promise<ExamTypesEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    if (await this.exists('name', body.name, [id])) throw new Error('examType.nameExists');
    const examTypesGroups = await this.prepareExamTypesGroups(body.examTypesGroups, id);
    if (!record.parentGroups?.length) record.parentGroups = undefined;
    return this.examTypesModel.findByIdAndUpdate(id, { ...body, examTypesGroups }, { new: true });
  }

  async delete(id: string): Promise<ExamTypesEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.examTypesModel.findByIdAndDelete(id);
  }
}