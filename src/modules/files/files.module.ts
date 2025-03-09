import { forwardRef, Module } from '@nestjs/common';
import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesProvider } from '@shared/providers';
import { MulterModule } from '@nestjs/platform-express';
import * as Multer from 'multer';
import * as path from 'node:path';
import { LinksModule } from '@modules/links/links.module';

export const storage = Multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.TEMP_PATH);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
		const filename = uniqueSuffix + path.extname(file.originalname);
		cb(null, filename);
	},
});

@Module({
	imports: [
		MongooseModule.forFeature([FilesProvider]),
		MulterModule.register({storage}),
		forwardRef(() => LinksModule)
	],
	controllers: [FilesController],
	providers: [FilesService],
	exports: [FilesService]
})
export class FilesModule {}