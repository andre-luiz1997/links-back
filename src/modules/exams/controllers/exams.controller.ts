import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
import { ExamsService } from '../services/exams.service';
import { CreateExamDTO, UpdateExamDTO } from '../dtos';
import { CustomRequest } from '@shared/types';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { ExamsEntity } from '../entities';


@Controller('exams')
export class ExamsController {
  constructor(
    @Inject(ExamsService) private examsService: ExamsService,
  ) { }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.examsService.getById(id));
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<ExamsEntity>> {
    return ResponseFactory.build(await this.examsService.getAll(pagination));
  }

  @Post()
  async createRecord(@Req() req: CustomRequest, @Body() body: CreateExamDTO) {
    body.user = req.user._id.toString();
    return ResponseFactory.build(await this.examsService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateExamDTO) {
    return ResponseFactory.build(await this.examsService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.examsService.delete(id));
  }
}