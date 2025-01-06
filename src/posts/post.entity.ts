import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/PostStatus.enum";
import { CreatePostMetaOptionsDto } from "src/meta-options/dtos/create-post-meta-options.dto";
import { targetModulesByContainer } from "@nestjs/core/router/router-module";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { User } from "src/users/user.entity";

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

    
    // relationship Between tags and metaoptions.
    // @Column("simple-array")
    // tags?: string[];

    
    @OneToOne(
        () => MetaOption,
        (metaOptions) => metaOptions.post
    ,{
        cascade: true,
        eager: true
    })
    metaOptions?: MetaOption;

    @ManyToOne(() => User,(user) => user.posts,{
        eager: true,
    })
    author: User;

   
}