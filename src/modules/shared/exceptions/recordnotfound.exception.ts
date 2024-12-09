import { HttpException, HttpStatus } from '@nestjs/common';

export class RecordNotFoundException extends HttpException {
  constructor(message?: string) {
    super( message ?? 'record_not_found', HttpStatus.NOT_FOUND);
  }
}
