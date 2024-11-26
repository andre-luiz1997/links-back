import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/constants';
@Module({
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: JWT.secret,
			signOptions: { expiresIn: JWT.expiresIn },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule {}