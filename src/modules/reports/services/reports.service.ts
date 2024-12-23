import { ExamsService } from '@modules/exams/services/exams.service';
import { ExamTypesService } from '@modules/examTypes/services/examTypes.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(ExamsService) private examsService: ExamsService,
    @Inject(ExamTypesService) private examTypesService: ExamTypesService,
  ) { }

  async getExamTypeReport(examTypeId: string, userId: string, props: { start: Date, end: Date }) {
    console.log('🚀 ~ file: reports.service.ts:13 ~ ReportsService ~ getExamTypeReport ~ userId 🚀 ➡➡', userId);
    const examsWithThisExamType = await this.examsService.getByExamType(examTypeId, userId);
    console.log('🚀 ~ file: reports.service.ts:14 ~ ReportsService ~ getExamTypeReport ~ examsWithThisExamType 🚀 ➡➡', examsWithThisExamType);
  }
}