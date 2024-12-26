import { 
    Controller, 
    Get,
    Param,
    Body,
    Post,
    Patch
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';


@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor (
        private readonly postsService: PostsService
    ) {
        
    }
    // get localhost:3000/posts/:userId
    @Get('/:userId?')
    public getPosts(@Param('userId') userId: string){
        return this.postsService.findAll(userId);
    }
    
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.'
    })
    @Post('/create/:userId?')
    public createPost(@Body() createPostDto: CreatePostDto){
        console.log(createPostDto)
        return 'Post added';
    }
    
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.'
    })
    @Patch()
    public updatePost(@Body() patchPostDto: PatchPostDto){
        console.log(patchPostDto)
        return 'Post updated';
    }
}
