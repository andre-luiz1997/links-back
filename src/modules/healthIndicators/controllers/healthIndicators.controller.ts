import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { HealthIndicatorsService } from '../services/healthIndicators.service';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { HealthIndicatorsEntity } from '../entities/examTypes.entity';
import { CreateHealthIndicatorDTO, UpdateHealthIndicatorDTO } from '../dtos';

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
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<HealthIndicatorsEntity>> {
    try {
      return ResponseFactory.build(await this.healthIndicatorsService.getAll(pagination));
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Post()
  async createRecord(@Body() body: CreateHealthIndicatorDTO) {
    return ResponseFactory.build(await this.healthIndicatorsService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateHealthIndicatorDTO) {
    return ResponseFactory.build(await this.healthIndicatorsService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.healthIndicatorsService.delete(id));
  }
}