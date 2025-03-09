import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProvidersEnum } from 'src/constants';
import { FilesEntity } from '../entities/files.entity';
import { join } from 'node:path';
import { existsSync, mkdirSync, rename, unlink } from 'node:fs';
import { FileNotFoundException } from '@shared/exceptions';
import { IFiles } from '../types/files';
import { LinksService } from '@modules/links/services/links.service';

@Injectable()
export class FilesService {
	constructor(
		@InjectModel(ProvidersEnum.FILES) private fileModel: Model<FilesEntity>,
		@Inject(LinksService) private linkService: LinksService
	) { }

	async moveToUpload(file: FilesEntity, uploadsPath: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			if (file.name.split('\\')[0] == process.env.UPLOAD_PATH) {
				resolve(true);
			}
			if (existsSync(file.path)) {
				const divider = uploadsPath?.includes('\\') ? '\\' : '/';
				const _folder = uploadsPath?.split(divider);
				_folder.pop();
				const uploadFolder = _folder.join(divider);

				if (!existsSync(uploadFolder)) mkdirSync(uploadFolder, { recursive: true });

				// ARQUIVO EXISTE
				rename(file.path, uploadsPath, err => {
					if (err != null) {
						reject(new FileNotFoundException(file.name, 'temp'));
					} else {
						try {
							file.path = uploadsPath;
							this.fileModel.updateOne({ _id: file._id }, { $set: { path: uploadsPath } }).then(() => {
								resolve(true);
							});
						} catch (error) {
							reject(error);
						}
					}
				});
			} else {
				reject(new FileNotFoundException(file.name, 'temp'));
			}
		});
	}

	async removeFileFromMemory(file: FilesEntity) {
		const filename = file.name;
		return new Promise<boolean>((resolve, reject) => {
			if (filename.startsWith('http')) resolve(true);
			try {
				if (existsSync(file.path)) {
					console.log('🚀 ~ files.service.ts:59 ~ FilesService ~ removeFileFromMemory ~ file.path 🚀 ➡➡', file.path);

					unlink(file.path, () => {
						resolve(true);
					});
				} else {
					resolve(true);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	async relateEntity(file: FilesEntity, props: Partial<IFiles>, method: 'save' | 'update') {
		switch (props.model) {
			case 'link': {
				if (props.modelId) {
					const link = await this.linkService.getById(props.modelId.toString());
					if (link) {
						if (link.profile?.image) {
							await this.delete(link.profile.image._id.toString());
						}
						await this.linkService.update(props.modelId.toString(), { profile: { ...link.profile, image: file } });
					}
				}
				break;
			}
		}
		if (method == 'save') {
			await this.moveToUpload(file, join(process.env.PUBLIC_PATH, file.name));
		}
	}

	async create(uploadedFile: Express.Multer.File, props: Partial<IFiles>) {
		const filepath = uploadedFile.path;
		const filename = props.model ? join('uploads', props.model, props.modelId.toString(), uploadedFile.filename) : uploadedFile.filename;
		
		let file = await this.fileModel.create({
			_id: new Types.ObjectId(),
			name: filename,
			originalName: uploadedFile.originalname,
			path: filepath,
			model: props.model,
			modelId: props.modelId,
			key: props.key,
		})

		if (file && props.model && props.modelId) {
			await this.relateEntity(file, props, 'save');
			file = await this.fileModel.findById(file._id);
		}
		return file;
	}

	async delete(_id: string) {
		console.log('🚀 ~ files.service.ts:113 ~ FilesService ~ delete ~ _id 🚀 ➡➡', _id);
		const file = await this.fileModel.findById(new Types.ObjectId(_id));
		console.log('🚀 ~ files.service.ts:116 ~ FilesService ~ delete ~ file 🚀 ➡➡', file);
		if (file) {
			await this.removeFileFromMemory(file);
			// if (file.model && file.modelId) {
			// 	await this.relateEntity(file, { model: file.model, modelId: file.modelId }, 'update');
			// }
			await this.fileModel.findByIdAndDelete(new Types.ObjectId(_id));
		}
	}
}