import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-param.dto';

@Injectable()
export class UsersService{
    
    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number 
    ) {
        return [
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