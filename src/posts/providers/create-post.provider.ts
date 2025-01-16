import { BadRequestException, Body, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostProvider {
    constructor(
        private readonly userService: UsersService,
        
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        private readonly tagsService: TagsService,
    ){}

    public async createPost(createPostDto: CreatePostDto,user: ActiveUserData){
        let author = undefined;
        let tags = undefined;
        try {
            // Find author from database on authorId
            author = await this.userService.findOneById(user.sub);
            // Find tags
            tags = await this.tagsService.findMultipleTags(createPostDto.tags);

        } catch (error) {
            throw new ConflictException(error);
        }

        if(createPostDto.tags.length !== tags.length){
            throw new BadRequestException('Please check your tag Ids');
        }
        

        // create a post.
        let post = this.postRepository.create({
            ...createPostDto,
            author: author,
            tags: tags
        })

        try {
            return await this.postRepository.save(post);
        } catch (error) {
            throw new ConflictException(error,{
                description: 'Ensure Post slug is unique and not duplicate.'
            })
        }
        
    }
}
