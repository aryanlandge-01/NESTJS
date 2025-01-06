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
        // Find author from database on authorId
        let author = await this.userService.findOneById(createPostDto.authorId);
        
        let post = this.postRepository.create({
            ...createPostDto,
            author: author,
        })
        return await this.postRepository.save(post);
    }

    public async findAll(userId: string){
        // User.service
     
        
        let posts = await this.postRepository.find(
            {
                relations:{
                    metaOptions: true,
                    // author: true
                }
            }
        );
        return posts;
    }

    public async delete(id: number){
        let post = await this.postRepository.findOneBy({id});
        
        await this.postRepository.delete(id);

        // // delete the metaoption

        // await this.metaOptionRepository.delete(post.metaOptions.id);
        // let inversePost = await this.metaOptionRepository.find({
        //     where: {id: post.metaOptions.id},
        //     relations: {
        //         post: true,
        //     },
        // })

        // console.log(inversePost);
        return {deleted: true,id}
    }
}
