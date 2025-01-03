import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/PostStatus.enum";
import { CreatePostMetaOptionsDto } from "src/users/dtos/create-post-meta-options.dto";
import { targetModulesByContainer } from "@nestjs/core/router/router-module";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false
    })
    title: string;

    @Column({
      type: 'enum',
      enum: PostType,
      nullable: false,
      default: PostType.POST,
    })
    postType: PostType;
    
    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique: true,
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: PostStatus,
        nullable: false,
        default: PostStatus.DRAFT,
    })
    status: string;
    
    @Column({
        type: 'text',
        nullable: true
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true
    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    publishOn?: Date;

    
    // Later point In the life.
    @Column()
    tags?: string[];

    @Column()
    metaOptions?: CreatePostMetaOptionsDto[];
   
}