import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ExamTypesService } from '../services/examTypes.service';
import { CreateExamTypeDTO, UpdateExamTypeDTO } from '../dtos';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { ExamTypesEntity } from '../entities/examTypes.entity';

@Controller('exam-types')
export class ExamTypesController {
  constructor(
    @Inject(ExamTypesService) private examTypesService: ExamTypesService,
  ) { }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.examTypesService.getById(id));
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<ExamTypesEntity>> {
    try {
      return ResponseFactory.build(await this.examTypesService.getAll(pagination));
    } catch (error) {
      throw error
    }
  }

  @Post()
  async createRecord(@Body() body: CreateExamTypeDTO) {
    return ResponseFactory.build(await this.examTypesService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateExamTypeDTO) {
    return ResponseFactory.build(await this.examTypesService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.examTypesService.delete(id));
  }
}