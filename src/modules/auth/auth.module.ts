import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGateway } from './gateways';
import { RolesModule } from '@modules/roles/roles.module';
@Module({
	imports: [
		forwardRef(() => UsersModule),
		forwardRef(() => RolesModule),
		JwtModule.register({
			secret: JWT.secret,
			signOptions: { expiresIn: JWT.ACCESS_TOKEN_EXPIRATION },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		AuthGateway,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	],
	exports: [AuthService]
})
export class AuthModule { }