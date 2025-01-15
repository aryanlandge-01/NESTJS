import { 
    Controller, 
    Get,
    Param,
    Body,
    Post,
    Patch,
    Delete,
    Query,
    ParseIntPipe,
    Req
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-post.dto';
import { request } from 'http';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';


@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor (
        private readonly postsService: PostsService
    ) {
        
    }
    // get localhost:3000/posts/:userId
    @Get('/:userId?')
    public getPosts(
        @Param('userId') userId: string,
        @Query() postQuery: GetPostsDto,
    ){
        console.log(postQuery)
        return this.postsService.findAll(postQuery, userId);
    }
    
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.'
    })
    @Post('/create/:userId?')
    public createPost(@Body() createPostDto: CreatePostDto){
        return this.postsService.createPost(createPostDto);
    }
    
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.'
    })
    @Patch()
    public updatePost(@Body() patchPostDto: PatchPostDto){
        return this.postsService.update(patchPostDto);
    }


    @Delete()
    public deletePost(@Query('id',ParseIntPipe)  id: number){
        return this.postsService.delete(id);
    }
}
