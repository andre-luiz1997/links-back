import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDTO } from '../dtos';
import { UpdateRoleDTO } from '../dtos/update-role.dto';
import { DefaultPaginatedResponse, ResponseFactory } from '@shared/response';
import { Pagination } from '@shared/decorators';
import { PaginationProps } from '@shared/pagination';
import { RolesEntity } from '../entities/roles.entity';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(RolesService) private rolesService: RolesService
  ) {}

  @Get('permissions')
  async getPermissions() {
    return ResponseFactory.build(await this.rolesService.getPermissions());
  }

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return ResponseFactory.build(await this.rolesService.getById(id))
  }

  @Get()
  async getRecords(@Pagination() pagination: PaginationProps): Promise<DefaultPaginatedResponse<RolesEntity[]>> {
    const res = await this.rolesService.getAll(pagination);
    return ResponseFactory.build(res);
  }

  @Post()
  async createRecord(@Body() body: CreateRoleDTO) {
    return ResponseFactory.build(this.rolesService.create(body));
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateRoleDTO) {
    const data = await this.rolesService.update(id, body);
    this.rolesService.$role.next(data);
    return ResponseFactory.build(data);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return ResponseFactory.build(this.rolesService.delete(id));
  }
}