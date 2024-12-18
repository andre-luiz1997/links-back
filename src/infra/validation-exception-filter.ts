import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Verifica se o erro é de validação do Mongoose
    if (exception.name === 'ValidationError') {
      console.log('🚀 ~ file: validation-exception-filter.ts:12 ~ ValidationExceptionFilter ~ exception 🚀 ➡➡', exception);
      const errors = Object.keys(exception.errors).map((key) => ({
        field: key,
        message: exception.errors[key].message,
      }));

      // Responde com um erro HTTP 400 (Bad Request) e informações detalhadas
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Validation failed',
        errors,
      });
    }

    // Para outros erros, repassa normalmente
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      return response.status(status).json({
        ...(
          typeof exceptionResponse === 'object' ? exceptionResponse : { message: exceptionResponse }
        ),
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    // Caso não seja uma exceção esperada, retorna um erro genérico
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message ?? 'Internal server error',
    });
  }
}