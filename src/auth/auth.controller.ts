import { Controller } from '@nestjs/common';
import { AuthService } from './Provider/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){

    }
}
