import { ExamsService } from '@modules/exams/services/exams.service';
import { IResultEntry } from '@modules/exams/types';
import { ExamTypesService } from '@modules/examTypes/services/examTypes.service';
import { IUsers } from '@modules/users/types/users';
import { Inject, Injectable } from '@nestjs/common';
import { compareIds, configureDayjs, getDateRange } from '@shared/functions';
import { Types } from 'mongoose';
import { SettingsEnum } from 'src/constants';
const dayjs = configureDayjs();

export type DashboardIndicator = IResultEntry & { date?: Date }

@Injectable()
export class ReportsService {
  constructor(
    @Inject(ExamsService) private examsService: ExamsService,
    @Inject(ExamTypesService) private examTypesService: ExamTypesService,
  ) { }

  async getExamTypeReport(examTypeId: string, userId: string, props: { start: Date, end: Date }) {
    const examsWithThisExamType = await this.examsService.getByExamType(examTypeId, userId, props);
    const dates = getDateRange(props.start, props.end, 'days');
    return dates.map(date => {
      return {
        date,
        values: examsWithThisExamType.find(exam => dayjs(exam.date).isSame(dayjs(date)))?.results?.find(result => compareIds(result.examType._id, examTypeId))
      }
    })
  }

  async getExamTypesReport(examTypeIds: string[], userId: string, props: { start: Date, end: Date }) {
    const examsWithThisExamTypes = await this.examsService.getByExamType(examTypeIds, userId, props);
    const dates = getDateRange(props.start, props.end, 'days');

    return examTypeIds.map(examTypeId => {
      return {
        examTypeId,
        values: dates.map(date => {
          return {
            date,
            values: examsWithThisExamTypes.find(exam => dayjs(exam.date).isSame(dayjs(date)))?.results?.find(result => compareIds(result.examType._id, examTypeId)) ?? null
          }
        })
      }
    })
  }

  async getDashboardIndicators(user: IUsers): Promise<DashboardIndicator[]> {
    const dashboardIndicators = user.settings?.find((setting) => setting.key === SettingsEnum.DASHBOARD_INDICATORS)
    if (!dashboardIndicators?.value?.length) return [];
    const examsWithThisExamTypes = await this.examsService.getByExamType(dashboardIndicators.value, user._id.toString(), {
      sortOrder: -1, populate: {
        path: 'results',
        populate: 'examType'
      }
    });
    const examTypes = await this.examTypesService.getAll({
      filters: [
        { field: '_id', value: dashboardIndicators.value?.map(v => new Types.ObjectId(v)) ?? [], operator: 'IN' }
      ]
    });
    return examTypes?.records?.map(examType => {
      const lastExamWithThisExamType = examsWithThisExamTypes?.find(exam => {
        return exam.results?.find(result => compareIds(result.examType._id, examType._id))
      });
      const resultEntry = lastExamWithThisExamType?.results?.find(result => compareIds(result.examType._id, examType._id));
      if (!resultEntry) return { examType };
      return {
        ...resultEntry,
        date: lastExamWithThisExamType?.date
      }
    });
  }
}