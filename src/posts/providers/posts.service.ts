import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-post.dto';

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

    public async findAll(postQuery: GetPostsDto,userId: string){
        
     
        
        let posts = await this.postRepository.find(
            {
                relations:{
                    metaOptions: true,
                    // tags: true
                    // author: true
                },
                skip: (postQuery.page - 1) * postQuery.limit,
                take: postQuery.limit,
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
        let tags = undefined;
        let post = undefined;

        try {
            tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
        } catch (error) {
            throw new RequestTimeoutException(
                "Unable to process your request at the moment please try again later. "
            );
        }

        if (!tags || tags.length != patchPostDto.tags.length){
            throw new BadRequestException(
                "please check your tag Ids and ensure they are correct"
            )
        }


        // find the post
        try {
            post = await this.postRepository.findOneBy({
                id: patchPostDto.id,
            });
        } catch (error) {
            throw new RequestTimeoutException(
                "Unable to process your request at the moment please try again later. "
            );
        }

        if (!post) {
            throw new BadRequestException('The post id does not exist')
        }

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

        try {
            await this.postRepository.save(post);
        } catch (error) {
            throw new RequestTimeoutException(
                "Unable to process your request at the moment please try again later. "
            );
        }

        // save the post and return
        return post;
    }
}
