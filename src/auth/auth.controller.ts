import { Body, Controller,Post,Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './Provider/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Injecting the auth service
         */
        private readonly authService: AuthService,
    ){}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto)
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
       return this.authService.refreshTokens(refreshTokenDto);
    }
}
