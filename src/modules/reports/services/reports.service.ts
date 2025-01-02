import { ExamsService } from '@modules/exams/services/exams.service';
import { ExamTypesService } from '@modules/examTypes/services/examTypes.service';
import { Inject, Injectable } from '@nestjs/common';
import { compareIds, configureDayjs, getDateRange } from '@shared/functions';
const dayjs = configureDayjs();

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
}