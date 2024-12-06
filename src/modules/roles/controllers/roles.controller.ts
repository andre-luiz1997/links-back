import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDTO } from '../dtos';
import { UpdateRoleDTO } from '../dtos/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(RolesService) private rolesService: RolesService
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.rolesService.getById(id);
  }

  @Get()
  async getRecords() {
    return this.rolesService.getAll();
  }

  @Post()
  async createRecord(@Body() body: CreateRoleDTO) {
    return this.rolesService.create(body);
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateRoleDTO) {
    return this.rolesService.update(id, body);
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }
}