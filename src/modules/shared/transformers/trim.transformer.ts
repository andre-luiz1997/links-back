import { Transform } from "class-transformer";
import { isEmpty } from "class-validator";

export function Trim() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      if(isEmpty(value)) return null;
      return value.trim(); // Remove espaços extras
    }
    return value; // Retorna o valor original se não for string
  });
}