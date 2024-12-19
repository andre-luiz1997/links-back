import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecordNotFoundException } from '@shared/exceptions';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { CreateExamDTO, ResultEntryDTO, UpdateExamDTO } from '../dtos';
import { ExamsEntity } from '../entities/exams.entity';
import { UsersService } from '@modules/users/services/users.service';
import { LabsService } from '@modules/labs/services/labs.service';
import { ExamTypesService } from '@modules/examTypes/services/examTypes.service';
import { mapPagination, PaginationProps } from '@shared/pagination';
import { compareIds } from '@shared/functions';
import { ResultEntry } from '../entities';
import { ExamTypesEntity } from '@modules/examTypes/entities/examTypes.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(ProvidersEnum.EXAMS) private examsModel: Model<ExamsEntity>,
    @Inject(UsersService) private usersService: UsersService,
    @Inject(LabsService) private labsService: LabsService,
    @Inject(ExamTypesService) private examTypesService: ExamTypesService,
  ) { }

  getById(id: string): Promise<ExamsEntity> {
    return this.examsModel.findById(new Types.ObjectId(id)).populate('user').populate('lab').populate('results.examType').exec();
  }

  async getAll(pagination?: PaginationProps) {
    const { query, $and } = mapPagination(this.examsModel, {pagination, populate: [
      {
        $lookup: {
          from: ProvidersEnum.LABS.toLowerCase(),
          localField: 'lab',
          foreignField: '_id',
          as: 'lab'
        }
      },
      {
        $unwind: {path: '$lab', preserveNullAndEmptyArrays: true},
        
      }
    ]});

    const records = await query.exec();
    return {
      records,
      totalRecords: (await this.examsModel.aggregate([...$and, {
        $count: "total"
      }]).exec())?.[0]?.total,
    };
  }

  async create(body: CreateExamDTO): Promise<ExamsEntity> {
    let record = new this.examsModel(body);
    if (!record._id) record._id = new Types.ObjectId();
    const user = await this.usersService.getById(body.user);
    if (!user) throw new RecordNotFoundException('exams.userNotFound');
    const lab = await this.labsService.getById(body.lab);
    record.user = user;
    record.lab = lab;
    if(body.results) {
      const examTypes = (await this.examTypesService.getAll())?.records as ExamTypesEntity[];
      const res = await this.mapEntryGroups(examTypes,body.results)
      record.results = res;
    }
    record = await this.examsModel.create(record);
    return this.examsModel.findById(record._id).populate('user').populate('lab');
  }

  private mapEntryGroups(examTypes: ExamTypesEntity[], resultEntries: ResultEntryDTO[]) {
    
    if(!resultEntries?.length) return;
    return resultEntries.map(resultEntry => {
      const examType = examTypes.find(type => compareIds(type._id, resultEntry.examType));
      if (!examType) throw new RecordNotFoundException('results.examTypeNotFound');
      // console.log('🚀 ~ file: exams.service.ts:84 ~ ExamsService ~ entryGroups ~ resultEntry.entryGroups 🚀 ➡➡', resultEntry.entryGroups);
      const entryGroups = resultEntry.entryGroups?.map(entryGroup => {
        const examTypeGroup = examType.examTypesGroups.find(type => compareIds(type._id, entryGroup.examType))
        return {
          examType: examTypeGroup,
          value: entryGroup.value,
          entryGroups: this.mapEntryGroups(examTypes,entryGroup.entryGroups)
        } as ResultEntry
      });
      // console.dir(entryGroups, {depth: 10});
      return { ...resultEntry, examType, value: resultEntry.value, entryGroups } as ResultEntry;
    }) as ResultEntry[];
  }

  async update(id: string, body: UpdateExamDTO): Promise<ExamsEntity> {
    let record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    record = new this.examsModel(body);
    record._id = new Types.ObjectId(id);
    if (body.user) {
      const user = await this.usersService.getById(body.user);
      if (!user) throw new RecordNotFoundException('exams.userNotFound');
      record.user = user;
    }
    if (body.lab) {
      const lab = await this.labsService.getById(body.lab);
      if (!lab) throw new RecordNotFoundException('exams.labNotFound');
      record.lab = lab;
    }
    if (body.results) {
      const examTypes = (await this.examTypesService.getAll())?.records as ExamTypesEntity[];
      const res = await this.mapEntryGroups(examTypes,body.results)
      record.results = res;
    }
    return this.examsModel.findByIdAndUpdate(id, record, { new: true }).populate('user').populate('lab');
  }

  async delete(id: string): Promise<ExamsEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.examsModel.findByIdAndDelete(id);
  }
}