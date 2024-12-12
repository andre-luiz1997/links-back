import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateLabDTO, UpdateLabDTO } from '../dtos';
import { LabsService } from '../services/labs.service';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { LabsEntity } from '../entities/labs.entity';

@Controller('labs')
export class LabsController {
  constructor(
    @Inject(LabsService) private labsService: LabsService,
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.labsService.getById(id))
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<LabsEntity>> {
    return ResponseFactory.build(await this.labsService.getAll(pagination));
  }

  @Post()
  async createRecord(@Body() body: CreateLabDTO) {
    return ResponseFactory.build(await this.labsService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateLabDTO) {
    return ResponseFactory.build(await this.labsService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.labsService.delete(id));
  }
}