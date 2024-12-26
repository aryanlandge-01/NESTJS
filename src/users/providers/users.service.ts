import { Inject, Injectable,forwardRef} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from 'src/auth/Provider/auth.service';

/**
 * Class to Connect to User Table and perform CRUD operations
 */
@Injectable()
export class UsersService{
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ){}

    /**
     * Method to get all users from the database
     */
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
    
    /**
     * Method to get a single user by Id
    */
    public findOneById(id: string){
        return {
            id: id,
            name: 'John',
            email: 'jhon@gmail.com'
        };
    }
}