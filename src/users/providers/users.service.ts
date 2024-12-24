import { Inject, Injectable,forwardRef} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from 'src/auth/Provider/auth.service';

@Injectable()
export class UsersService{
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ){}


    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number 
    ) {
        const isAuth = this.authService.isAuth();
        
        return isAuth && [
            { 
              name: 'John',
              email: 'jhon@gmail.com' 
            },
            { 
              name: 'Alice', 
              email: 'alice@gmail.com'
            },
        ];
    }

    public findOneById(id: string){
        return {
            id: id,
            name: 'John',
            email: 'jhon@gmail.com'
        };
    }
}