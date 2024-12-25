import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, validate, ValidateNested } from "class-validator";
import { PostStatus } from "../enums/PostStatus.enum";
import { PostType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "src/users/dtos/create-post-meta-options.dto";
import { Type } from "class-transformer";


export class CreatePostDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    @IsEnum(PostType)
    @IsNotEmpty()
    postTypes: PostType;
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example: "this-is-a-slug"' 
    })
    slug: string;

    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;

    @IsString()
    @IsOptional()
    content?: string;

    @IsOptional()
    @IsJSON()
    schema?: string;

    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @IsISO8601()
    @IsOptional()
    publishOn: Date;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @MinLength(3,{each: true})
    tags?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions: CreatePostMetaOptionsDto;
}