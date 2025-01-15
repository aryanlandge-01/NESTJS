import { Body, Controller,Post,Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './Provider/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';

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

    // @Get('get-user/:id')
    // public getUser(@Param('id') id: number){
    //     return this.authService.getUser(id);
    // }


}
