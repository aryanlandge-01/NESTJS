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
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user-dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';


/**
 * Controller to handle all user related requests
*/
@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        // Inject the UsersService
        private readonly usersService: UsersService
    ){

    }


    @Get('/:id?')
    @ApiOperation({
        summary: 'Get users',
        description: 'Get all users or a specific user'
    })
    @ApiResponse({
        status: 200,
        description: 'The users have been successfully retrieved.',
        type: [GetUsersParamDto]
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'The number of users to return',
        example: 10
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'The position of the page to return',
        example: 1
    })
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit: number | undefined,
        @Query('page' ,new DefaultValuePipe(1),ParseIntPipe) page: number | undefined)
    {
       
        return this.usersService.findAll(getUsersParamDto,limit,page);
    }

    @Post()
    public createUsers(
        @Body() createUserDto: CreateUserDto,
    )
    {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(AccessTokenGuard)
    @Post('create-many')
    public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto){
        return this.usersService.createMany(createManyUsersDto);
    }

    @Patch()
    public patchUsers(@Body() patchUserDto: PatchUserDto){
        console.log(patchUserDto);
        return "You sent a patch request to users endpoint."
    }
}
