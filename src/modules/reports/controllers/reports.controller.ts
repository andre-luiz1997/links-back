import { Controller, Get, Inject, Param, ParseArrayPipe, Query, Req } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { CustomRequest } from '@shared/types';
import { ResponseFactory } from '@shared/response';
import { ApiQuery } from '@nestjs/swagger';
import { isEmpty } from 'class-validator';

@Controller('reports')
export class ReportsController {
  constructor(
    @Inject(ReportsService) private reportsService: ReportsService,
  ) { }

  @Get('exam-types/:examTypeId')
  @ApiQuery({
    name: 'start',
    required: true,
    type: Date,
  })
  @ApiQuery({
    name: 'end',
    required: true,
    type: Date,
  })
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

  @Get('exam-types')
  @ApiQuery({
    name: 'examTypeIds',
    required: true,
    type: [String],
    isArray: true,
  })
  @ApiQuery({
    name: 'start',
    required: true,
    type: Date,
  })
  @ApiQuery({
    name: 'end',
    required: true,
    type: Date,
  })
  async examTypeIds(
    @Req() req: CustomRequest,
    @Query('examTypeIds', new ParseArrayPipe({separator: ','})) examTypeIds: string[],
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    if(!examTypeIds?.length) throw new Error('At least one exam type id must be provided');
    return ResponseFactory.build(await this.reportsService.getExamTypesReport(examTypeIds?.filter(item => !isEmpty(item)), req.user._id.toString(), {
      start: new Date(start),
      end: new Date(end),
    }));
  }
}