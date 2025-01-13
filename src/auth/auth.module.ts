import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './Provider/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './Provider/hashing.provider';
import { BcryptProvider } from './Provider/bcrypt.provider';
import { SignInProvider } from './Provider/sign-in.provider';




@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
    provide: HashingProvider,
    useClass: BcryptProvider
    },
    SignInProvider
  ],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService,HashingProvider],
})
export class AuthModule {}
