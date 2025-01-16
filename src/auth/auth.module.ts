import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './Provider/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './Provider/hashing.provider';
import { BcryptProvider } from './Provider/bcrypt.provider';
import { SignInProvider } from './Provider/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './Provider/generate-tokens.provider';
import { RefreshTokensProvider } from './Provider/refresh-tokens.provider';



@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
    provide: HashingProvider,
    useClass: BcryptProvider
    },
    SignInProvider,
    GenerateTokensProvider,
    RefreshTokensProvider
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  exports: [AuthService,HashingProvider],
})
export class AuthModule {}
