import { Transform } from "class-transformer";

export function Trim() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim(); // Remove espaços extras
    }
    return value; // Retorna o valor original se não for string
  });
}