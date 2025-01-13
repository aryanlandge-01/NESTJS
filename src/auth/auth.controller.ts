import { Body, Controller,Post,Get, Param } from '@nestjs/common';
import { AuthService } from './Provider/auth.service';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Injecting the auth service
         */
        private readonly authService: AuthService,
    ){}

    @Post('sign-in')
    public signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto)
    }

    // @Get('get-user/:id')
    // public getUser(@Param('id') id: number){
    //     return this.authService.getUser(id);
    // }


}
