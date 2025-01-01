import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,

 } from 'typeorm';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true,
    })
    name: string;
    
    @Column({
        type: 'varchar',
        length: 512,
        nullable: false,
        unique: true,
    })
    slug: string;
    
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
    
    @Column({
        type: 'text',
        nullable: true
    })
    schema: string;
    
    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featuredImageUrl: string;

    // auto generated coloum 
    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}