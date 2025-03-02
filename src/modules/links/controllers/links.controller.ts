import { Body, Controller, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateLinkDTO } from '../dtos/create-link.dto';
import { ResponseFactory } from '@shared/response';
import { LinksService } from '../services/links.service';
import { CustomRequest } from '@shared/types';
import { UpdateLinkDTO } from '../dtos/update-link.dto';

@Controller('links')
export class LinksController {
  constructor(
    @Inject(LinksService) private linksService: LinksService
  ) {}

  @Post()
  async createRecord(@Body() body: CreateLinkDTO, @Req() req: CustomRequest) {
    body.user = req.user;
    return ResponseFactory.build(await this.linksService.create(body));
  }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.linksService.getById(id))
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateLinkDTO) {
    const data = await this.linksService.update(id, body);
    this.linksService.$link.next(data);
    return ResponseFactory.build(data);
  }
}