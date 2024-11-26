import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateLabDTO, UpdateLabDTO } from '../dtos';
import { LabsService } from '../services/labs.service';

@Controller('labs')
export class LabsController {
  constructor(
    @Inject(LabsService) private labsService: LabsService,
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.labsService.getById(id);
  }

  @Get()
  async getRecords() {
    return this.labsService.getAll();
  }

  @Post()
  async createRecord(@Body() body: CreateLabDTO) {
    return this.labsService.create(body);
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateLabDTO) {
    return this.labsService.update(id, body);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return this.labsService.delete(id);
  }
}