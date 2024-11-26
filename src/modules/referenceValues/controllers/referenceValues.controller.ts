import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ReferenceValuesService } from '../services/referenceValues.service';
import { CreateReferenceValuesDTO, UpdateReferenceValuesDTO } from '../dtos';

@Controller('referenceValues')
export class ReferenceValuesController {
  constructor(
    @Inject(ReferenceValuesService) private referenceValuesService: ReferenceValuesService,
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.referenceValuesService.getById(id);
  }

  @Get()
  async getRecords() {
    return this.referenceValuesService.getAll();
  }

  @Post()
  async createRecord(@Body() body: CreateReferenceValuesDTO) {
    return this.referenceValuesService.create(body);
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateReferenceValuesDTO) {
    return this.referenceValuesService.update(id, body);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return this.referenceValuesService.delete(id);
  }
}