import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { PlansService } from '../services/plans.service';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { PaginationProps } from '@shared/pagination';
import { Pagination } from '@shared/decorators';
import { PlansEntity } from '../entities/plans.entity';
import { CreatePlanDTO, UpdatePlanDto } from '../dtos';

@Controller('plans')
export class PlansController {
  constructor(
    @Inject(PlansService) private plansService: PlansService,
  ) { }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.plansService.getById(id))
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<PlansEntity>> {
    return ResponseFactory.build(await this.plansService.getAll(pagination));
  }

  @Post()
  async createRecord(@Body() body: CreatePlanDTO) {
    return ResponseFactory.build(await this.plansService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdatePlanDto) {
    return ResponseFactory.build(await this.plansService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.plansService.delete(id));
  }
}
