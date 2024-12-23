import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { CustomRequest } from '@shared/types';
import { ResponseFactory } from '@shared/response';

@Controller('reports')
export class ReportsController {
  constructor(
    @Inject(ReportsService) private reportsService: ReportsService,
  ) { }

  @Get('exam-types/:examTypeId')
  async examType(
    @Req() req: CustomRequest,
    @Param('examTypeId') examTypeId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    
    return ResponseFactory.build(await this.reportsService.getExamTypeReport(examTypeId, req.user._id.toString(), {
      start: new Date(start),
      end: new Date(end),
    }));
  }
}