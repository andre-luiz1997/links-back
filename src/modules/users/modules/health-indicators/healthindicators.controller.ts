import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
import { HealthIndicatorsService } from './healthindicators.service';
import { CreateHealthIndicatorDTO, UpdateHealthIndicatorDTO } from './dtos';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { CustomRequest } from '@shared/types';
import { PaginationProps } from '@shared/pagination';
import { Pagination } from '@shared/decorators';
import { ExamsEntity } from '@modules/exams/entities';

@Controller('health-indicators')
export class HealthIndicatorsController {
  constructor(
    @Inject(HealthIndicatorsService) private healthIndicatorsService: HealthIndicatorsService,
  ) { }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.healthIndicatorsService.getById(id)); 
  }

  @Get()
  async getRecords(@Req() req: CustomRequest, @Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<ExamsEntity>> {
    if (pagination) {
      pagination.filters ??= []
      if (!pagination.filters?.find(f => f.field === 'user')) {
        pagination.filters.push({ field: 'user', value: req.user._id, operator: 'IS' });
      }
    }
    
    return ResponseFactory.build(await this.healthIndicatorsService.getAll(pagination));
  }

  @Post()
  async createRecord(@Req() req: CustomRequest, @Body() body: CreateHealthIndicatorDTO) {
    body.user = req.user._id.toString();
    return ResponseFactory.build(await this.healthIndicatorsService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Req() req: CustomRequest, @Param('id') id: string, @Body() body: UpdateHealthIndicatorDTO) {
    body.user = req.user._id.toString();
    return ResponseFactory.build(await this.healthIndicatorsService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.healthIndicatorsService.delete(id));
  }
}
