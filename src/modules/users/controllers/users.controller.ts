import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import { ResponseFactory } from '@shared/response';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @Get(':id')
  async getRecordById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Get()
  async getRecords() {
    return this.usersService.getAll();
  }

  @Post()
  async createRecord(@Body() body: CreateUserDTO) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  async updateRecord(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return ResponseFactory.build(await this.usersService.update(id, body));
  }

  @Delete(':id')
  async deleteRecord(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}