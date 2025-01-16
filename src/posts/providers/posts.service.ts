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
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';

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

        
        private readonly paginationProvider: PaginationProvider,

        /**
         * Inject createPostProvider
         */
        private readonly createPostProvider: CreatePostProvider
    ) {}

    // method for creating a new post
    public async createPost(@Body() createPostDto: CreatePostDto,user: ActiveUserData){
        return await this.createPostProvider.createPost(createPostDto,user);
    }

    public async findAll(postQuery: GetPostsDto,userId: string): Promise<Paginated<Post>>{
        let posts = await this.paginationProvider.paginateQuery(
            {
            limit: postQuery.limit,
            page: postQuery.page
        },
        this.postRepository
    )
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
