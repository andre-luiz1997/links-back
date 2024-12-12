import { Controller, Get, Param, Query } from '@nestjs/common';
import { UtilsService } from '../services/utils.service';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { ResponseFactory } from '@shared/response';

@Controller('utils')
export class UtilsController {
  constructor(
    private utilsService: UtilsService
  ) {}

  @Get('zipcode/:zipcode')
  @ApiParam({
    name: 'zipcode',
    description: 'Zipcode to get address',
    required: true,
    type: 'string'
  })
  @ApiQuery({
    name: 'country',
    description: 'Country to get address',
    required: false,
    type: 'string'
  })
  async getAddress(@Param('zipcode') zipcode: string, @Query('country') country?: string) {
    return ResponseFactory.build(await this.utilsService.getAddress(zipcode, country));
  }
}