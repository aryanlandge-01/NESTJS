import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
    // Injecting the UsersService intermodular dependency
    constructor(
        // Inject The user service
        private readonly userService: UsersService,
        
        // Inject the post repository
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        public readonly metaOptionRepository: Repository<MetaOption>,

        // Inject the tagsService
        private readonly tagsService: TagsService,
    ) {}

    // method for creating a new post
    public async createPost(@Body() createPostDto: CreatePostDto){
        // Find author from database on authorId
        let author = await this.userService.findOneById(createPostDto.authorId);

        let tags = await this.tagsService.findMultipleTags(createPostDto.tags);


        // create a post.
        let post = this.postRepository.create({
            ...createPostDto,
            author: author,
            tags: tags
        })
        return await this.postRepository.save(post);
    }

    public async findAll(userId: string){
        // User.service
     
        
        let posts = await this.postRepository.find(
            {
                relations:{
                    metaOptions: true,
                    // tags: true
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

    public async update(patchPostDto: PatchPostDto){
        // find the tags

        let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);


        // find the post
        let post = await this.postRepository.findOneBy({
            id: patchPostDto.id,
        });

        // update the property of the post
        
        post.title = patchPostDto.title ?? post.title; //do not user spread operator.
        post.status = patchPostDto.status ?? post.status;
        post.content = patchPostDto.content ?? post.content;
        post.postType = patchPostDto.postTypes ?? post.postType;
        post.slug = patchPostDto.slug ?? post.slug;
        post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = patchPostDto.publishOn ?? post.publishOn;



        // Assign the new tags
        post.tags = tags;

        // save the post and return
        return await this.postRepository.save(post);
    }
}
