import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
    // Injecting the UsersService intermodular dependency
    constructor(
        
        private readonly userService: UsersService,

        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        public readonly metaOptionRepository: Repository<MetaOption>,

    ) {}

    // method for creating a new post
    public async createPost(@Body() createPostDto: CreatePostDto){
        let post = this.postRepository.create(createPostDto)
        return await this.postRepository.save(post);
    }

    public findAll(userId: string){
        // User.service
        const user = this.userService.findOneById(userId);
    
        return [
            {   
                user: user,
                title: "Post 1",
                content: "Content 1",
            },
            {   
                user: user,
                title: "Post 2",
                content: "Content 2",
            }
        ]
    }
}
