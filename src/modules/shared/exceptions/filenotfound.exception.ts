import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotFoundException extends HttpException {
  constructor(filename: string, context: 'temp' | 'uploads' = 'uploads') {
		super(`File ${filename} not found at /${context}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
