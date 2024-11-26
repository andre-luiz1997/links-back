import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ExamsService } from '../services/exams.service';
import { CreateExamDTO, UpdateExamDTO } from '../dtos';


@Controller('exams')
export class ExamsController {
  constructor(
    @Inject(ExamsService) private examsService: ExamsService,
  ) { }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.examsService.getById(id);
  }

  @Get()
  async getRecords() {
    return this.examsService.getAll();
  }

  @Post()
  async createRecord(@Body() body: CreateExamDTO) {
    return this.examsService.create(body);
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateExamDTO) {
    return this.examsService.update(id, body);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return this.examsService.delete(id);
  }
}