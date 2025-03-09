import { Body, Controller, Inject, Post, UploadedFile } from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { ApiFile } from '@shared/decorators';
import { CreateFileDTO } from '../dtos';
import { isEmpty, isNotEmpty } from 'class-validator';
import { ResponseFactory } from '@shared/response';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import { IFiles } from '../types/files';

@Controller('files')
export class FilesController {
  constructor(
    @Inject(FilesService) private fileService: FilesService
  ) {}

  @Post('/')
  @ApiFile('file')
  async uploadFile(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() body: Partial<IFiles>
  ) {
    try {
      if((isNotEmpty(body.model) && isEmpty(body.modelId)) || (isEmpty(body.model) && isNotEmpty(body.modelId))) {
        throw new Error('both model and modelId are required');
      }
  
      return ResponseFactory.build(await this.fileService.create(uploadedFile, body))
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}