import { 
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete, 
    Param,
    Query,
    Body,
    Req,
    ParseIntPipe,
    DefaultValuePipe,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user-dto';



@Controller('users')
export class UsersController {
    @Get('/:id?')
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit: number | undefined,
        @Query('page' ,new DefaultValuePipe(1),ParseIntPipe) page: number | undefined){
        console.log(getUsersParamDto);
        return "You sent a get request to users endpoint."
    }

    @Post()
    public createUsers(
        @Body() createUserDto: CreateUserDto,
    )
    {
        console.log(createUserDto instanceof CreateUserDto);
        return "User added successfully."
    }

    @Patch()
    public patchUsers(@Body() patchUserDto: PatchUserDto){
        console.log(patchUserDto);
        return "You sent a patch request to users endpoint."
    }
}
