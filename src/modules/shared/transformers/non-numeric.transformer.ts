import { Transform } from "class-transformer";

export function RemoveNonNumeric() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value; // Retorna o valor original caso não seja uma string
    }
    return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  });
}
