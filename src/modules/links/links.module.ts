import { Module } from '@nestjs/common';
import { LinksController } from './controllers/links.controller';
import { LinksService } from './services/links.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksProvider } from '@shared/providers';
@Module({
	imports: [
		MongooseModule.forFeature([LinksProvider])
	],
	controllers: [LinksController],
	providers: [LinksService],
})
export class LinksModule {}