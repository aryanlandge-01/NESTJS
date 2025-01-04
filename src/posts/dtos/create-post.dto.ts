import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, maxLength, MaxLength, MinLength, validate, ValidateNested } from "class-validator";
import { PostStatus } from "../enums/PostStatus.enum";
import { PostType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "src/meta-options/dtos/create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreatePostDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    @IsNotEmpty()
    title: string;
     
    @ApiProperty({
        enum: PostType,
        enumName: 'PostType',
        description: 'The type of the post. For example: "post" or "page",'
    })
    @IsEnum(PostType)
    @IsNotEmpty()
    postTypes: PostType;
    
    @ApiProperty({
        description: 'The slug of the post. For example: "this-is-a-slug"'
    })
    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example: "this-is-a-slug"' 
    })
    slug: string;

    @ApiProperty({
        enum: PostStatus,
        enumName: 'PostStatus',
        description: 'The status of the post. For example: "draft" or "publish",'
    })
    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;
    
    @ApiPropertyOptional({
        description: 'The content of the post. For example: "This is a post content"'
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: 'The excerpt of the post. For example: "This is a post excerpt"'
    })
    @IsOptional()
    @IsJSON()
    schema?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;
    
    @ApiPropertyOptional({
        description: 'The date when the post will be published. For example: "2021-01-01T00:00:00Z"',
        example: '2021-01-01T00:00:00Z'
    })
    @IsISO8601()
    @IsOptional()
    publishOn: Date;
    
    @ApiPropertyOptional({
        description: 'The tags of the post. For example: ["tag1", "tag2"]'
    })
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @MinLength(3,{each: true})
    tags?: string[];
    
    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    example: 'key1',
                    description: 'The key of the meta option. For example: "key1"'
                },
                value: {
                    type: 'string',
                    example: 'value1',
                    description: 'The value of the meta option. For example: "value1"'
                }
            }
        }
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions: CreatePostMetaOptionsDto;
}