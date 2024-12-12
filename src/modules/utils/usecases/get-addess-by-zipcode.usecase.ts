import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { IAddress } from "@shared/address";
import { DefaultUseCase } from "@shared/usecase";

@Injectable()
export class GetAddressByZipcodeUseCase implements DefaultUseCase {

  constructor(
    private httpService: HttpService
  ) { }

  execute(zipcode: string, country?: string) {
    return new Promise<IAddress>((resolve, reject) => {
      if (country != 'BRA') reject('Only Brazil is supported');
      this.httpService.get(`https://brasilapi.com.br/api/cep/v2/${zipcode}`).subscribe({
        next: response => {
          if(!response.data) reject('Zipcode not found');
          const data = response.data;
          resolve({
            city: data.city,
            state: data.state,
            neighborhood: data.neighborhood,
            street: data.street,
            country: 'BRA',
            zipCode: data.cep
          })
        },
        error: error => {
          reject(error)
        }
      })
    });
  }
}