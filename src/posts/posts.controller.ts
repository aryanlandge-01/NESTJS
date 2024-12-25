import { 
    Controller, 
    Get,
    Param,
    Body,
    Post
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CreatePostDto } from './dtos/create-post.dto';


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

    @Post('/create/:userId?')
    public createPost(@Body() createPostDto: CreatePostDto){
        console.log(createPostDto)
        return 'Post added';
    }
}
