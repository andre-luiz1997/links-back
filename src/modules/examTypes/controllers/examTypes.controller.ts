import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ExamTypesService } from '../services/examTypes.service';
import { CreateExamTypeDTO, UpdateExamTypeDTO } from '../dtos';

@Controller('examTypes')
export class ExamTypesController {
  constructor(
    @Inject(ExamTypesService) private examTypesService: ExamTypesService,
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.examTypesService.getById(id);
  }

  @Get()
  async getRecords() {
    return this.examTypesService.getAll();
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