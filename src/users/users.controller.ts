import { Controller,Get ,Post,Put,Patch,Delete} from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    public getUsers(){
        return "You sent a get request to users endpoint."
    }

    @Post()
    public postUser(){
        return "User added successfully."
    }
}
