import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryColumn, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: 'json',
        nullable: false
    })
    metaValue: string;
    
    @CreateDateColumn()
    createDate: Date;
    
    @UpdateDateColumn()
    updateDate: Date;
}