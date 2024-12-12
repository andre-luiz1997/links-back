import { Injectable } from '@nestjs/common';
import { GetAddressByZipcodeUseCase } from '../usecases';

@Injectable()
export class UtilsService {

  constructor(
    private getAddressByZipcodeUseCase: GetAddressByZipcodeUseCase
  ) {}

  getAddress(zipcode: string, country?: string) {
    return this.getAddressByZipcodeUseCase.execute(zipcode, country);
  }
}