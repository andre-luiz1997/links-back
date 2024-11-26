import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecordNotFoundException } from '@shared/exceptions';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { CreateExamDTO, UpdateExamDTO } from '../dtos';
import { ExamsEntity } from '../entities/exams.entity';
import { UsersService } from '@modules/users/services/users.service';
import { LabsService } from '@modules/labs/services/labs.service';

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(ProvidersEnum.EXAMS) private examsModel: Model<ExamsEntity>,
    @Inject(UsersService) private usersService: UsersService,
    @Inject(LabsService) private labsService: LabsService,
  ) { }

  getById(id: string): Promise<ExamsEntity> {
    return this.examsModel.findById(new Types.ObjectId(id)).populate('user').populate('lab').exec();
  }

  getAll(): Promise<ExamsEntity[]> {
    return this.examsModel.find().exec();
  }

  async create(body: CreateExamDTO): Promise<ExamsEntity> {
    let record = new this.examsModel(body);
    if (!record._id) record._id = new Types.ObjectId();
    const user = await this.usersService.getById(body.user);
    if (!user) throw new RecordNotFoundException('exams.userNotFound');
    const lab = await this.labsService.getById(body.lab);
    record.user = user;
    record.lab = lab;
    record = await this.examsModel.create(record); 
    return this.examsModel.findById(record._id).populate('user').populate('lab');
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
    return this.examsModel.findByIdAndUpdate(id, record, { new: true }).populate('user').populate('lab');
  }

  async delete(id: string): Promise<ExamsEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.examsModel.findByIdAndDelete(id);
  }
}