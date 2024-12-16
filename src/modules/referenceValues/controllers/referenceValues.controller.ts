import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ReferenceValuesService } from '../services/referenceValues.service';
import { CreateReferenceValuesDTO, UpdateReferenceValuesDTO } from '../dtos';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { ResponseFactory } from '@shared/response';

@Controller('reference-values')
export class ReferenceValuesController {
  constructor(
    @Inject(ReferenceValuesService) private referenceValuesService: ReferenceValuesService,
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.referenceValuesService.getById(id));
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps) {
    if(pagination.filters && typeof pagination.filters === 'string') pagination.filters = JSON.parse(pagination.filters);
    return ResponseFactory.build(await this.referenceValuesService.getAll(pagination));
  }

  @Post()
  async createRecord(@Body() body: CreateReferenceValuesDTO) {
    return ResponseFactory.build(await this.referenceValuesService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateReferenceValuesDTO) {
    return ResponseFactory.build(await this.referenceValuesService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.referenceValuesService.delete(id));
  }
}