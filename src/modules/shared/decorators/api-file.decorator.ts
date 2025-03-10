import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFile(fieldName = 'file', required = false, localOptions?: MulterOptions) {
	return applyDecorators(
		UseInterceptors(FileInterceptor(fieldName, localOptions)),
		ApiConsumes('multipart/form-data'),
		ApiBody({
			schema: {
				type: 'object',
				required: required ? [fieldName] : [],
				properties: {
					[fieldName]: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		}),
	);
}
