import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
import { HealthIndicatorsService } from './healthindicators.service';
import { CreateHealthIndicatorDTO, UpdateHealthIndicatorDTO } from './dtos';
import { ResponseFactory } from '@shared/response';
import { CustomRequest } from '@shared/types';

@Controller('health-indicators')
export class HealthIndicatorsController {
  constructor(
    @Inject(HealthIndicatorsService) private healthIndicatorsService: HealthIndicatorsService,
  ) { }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.healthIndicatorsService.getById(id);
  }

  @Get()
  async getRecords() {
    return this.healthIndicatorsService.getAll();
  }

  @Post()
  async createRecord(@Req() req: CustomRequest, @Body() body: CreateHealthIndicatorDTO) {
    body.user = req.user._id.toString();
    return this.healthIndicatorsService.create(body);
  }

  @Patch(':id')
  async updateRecord(@Req() req: CustomRequest, @Param('id') id: string, @Body() body: UpdateHealthIndicatorDTO) {
    body.user = req.user._id.toString();
    return ResponseFactory.build(await this.healthIndicatorsService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return this.healthIndicatorsService.delete(id);
  }
}
