import { Injectable } from '@nestjs/common';
import { LinksEntity } from '../entities/links.entity';
import { BehaviorSubject } from 'rxjs';
import { ProvidersEnum } from 'src/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { mapPagination, PaginationProps } from '@shared/pagination';
import { PaginatedResult } from '@shared/response';
import { CreateLinkDTO } from '../dtos/create-link.dto';
import { UpdateLinkDTO } from '../dtos/update-link.dto';
import { RecordNotFoundException } from '@shared/exceptions';

@Injectable()
export class LinksService {
  $link = new BehaviorSubject<LinksEntity | undefined>(undefined);

  constructor(
    @InjectModel(ProvidersEnum.LINKS) private linksModel: Model<LinksEntity>,
  ) { }

  exists(prop: string, value: any, ignoreIds: string[] = []) {
    return this.linksModel.exists({ [prop]: value, _id: { $nin: ignoreIds.map(id => new Types.ObjectId(id)) } });
  }

  getById(id: string): Promise<LinksEntity> {
    return this.linksModel.findById(new Types.ObjectId(id)).populate({
      path: 'profile',
      populate: {
        path: 'image'
      }
    }).lean().exec();
  }

  getOne(where: any): Promise<LinksEntity | undefined> {
    return this.linksModel.findOne(where).populate({
      path: 'profile',
      populate: {
        path: 'image'
      }
    }).exec();
  }

  async getAll(pagination?: PaginationProps): Promise<PaginatedResult<LinksEntity[]>> {
    const { query, $and } = mapPagination(this.linksModel, { pagination });

    const records = await query.exec();
    return {
      records,
      totalRecords: (await this.linksModel.aggregate([...$and, {
        $count: "total"
      }]).exec())[0]?.total
    };
  }

  async create(body: CreateLinkDTO): Promise<LinksEntity> {
    const record = new this.linksModel(body);
    if (!record._id) record._id = new Types.ObjectId();
    return this.linksModel.create(record);
  }

  async update(id: string, body: UpdateLinkDTO): Promise<LinksEntity> {
    if (!await this.getById(id)) throw new Error('link.notFound');
    // Ajustar o body para conter apenas o ObjectId em profile.image
    if (body.profile?.image && typeof body.profile.image === 'object' && '_id' in body.profile.image) {
      // @ts-ignore
      body.profile.image = body.profile.image._id; // Extrai apenas o _id
    }
    console.log('🚀 ~ links.service.ts:52 ~ LinksService ~ update ~ body 🚀 ➡➡', body);
    return this.linksModel.findByIdAndUpdate(new Types.ObjectId(id), { $set: body }, { new: true }).exec();
  }

  async delete(id: string): Promise<LinksEntity> {
    const record = await this.getById(id);
    if (!record) throw new RecordNotFoundException();
    return this.linksModel.findByIdAndDelete(id);
  }
}