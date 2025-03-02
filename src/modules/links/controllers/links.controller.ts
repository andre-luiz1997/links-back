import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateLinkDTO } from '../dtos/create-link.dto';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { LinksService } from '../services/links.service';
import { CustomRequest } from '@shared/types';
import { UpdateLinkDTO } from '../dtos/update-link.dto';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { LinksEntity } from '../entities/links.entity';

@Controller('links')
export class LinksController {
  constructor(
    @Inject(LinksService) private linksService: LinksService
  ) {}

  @Post('/default')
  async createDefaultRecord(@Req() req: CustomRequest) {
    const body = new CreateLinkDTO();
    body.user = req.user;
    body.profile = {
      show: true,
    }
    body.items = []
    body.configuration = {
      theme: 'default'
    }
    return ResponseFactory.build(await this.linksService.create(body));
  }

  @Post()
  async createRecord(@Body() body: CreateLinkDTO, @Req() req: CustomRequest) {
    body.user = req.user;
    return ResponseFactory.build(await this.linksService.create(body));
  }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.linksService.getById(id))
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<LinksEntity[]>> {
    const res = await this.linksService.getAll(pagination);
    return ResponseFactory.build(res);
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateLinkDTO) {
    const data = await this.linksService.update(id, body);
    this.linksService.$link.next(data);
    return ResponseFactory.build(data);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(await this.linksService.delete(id));
  }
}