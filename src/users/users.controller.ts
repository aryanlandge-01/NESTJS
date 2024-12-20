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
    DefaultValuePipe
} from '@nestjs/common';



@Controller('users')
export class UsersController {
    @Get('/:id/:name?')
    public getUsers(
        @Param('id',ParseIntPipe) id: number | undefined,
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit: number | undefined,
        @Query('page' ,new DefaultValuePipe(1),ParseIntPipe) page: number | undefined){
        console.log("Types of Id: ",typeof id);
        console.log(
            "Types of query",
            limit,
            page
        );
        return "You sent a get request to users endpoint."
    }

    @Post()
    public postUser(@Body() request: any){
        console.log(request);
        return "User added successfully."
    }
}
