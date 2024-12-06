import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ExamTypesService } from '../services/examTypes.service';
import { CreateExamTypeDTO, UpdateExamTypeDTO } from '../dtos';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { DefaultPaginatedResponse } from '@shared/response';
import { ExamTypesEntity } from '../entities/examTypes.entity';

@Controller('exam-types')
export class ExamTypesController {
  constructor(
    @Inject(ExamTypesService) private examTypesService: ExamTypesService,
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.examTypesService.getById(id);
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<ExamTypesEntity>> {
    return {
      data: await this.examTypesService.getAll(pagination)
    };
  }

  @Post()
  async createRecord(@Body() body: CreateExamTypeDTO) {
    return this.examTypesService.create(body);
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateExamTypeDTO) {
    return this.examTypesService.update(id, body);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return this.examTypesService.delete(id);
  }
}