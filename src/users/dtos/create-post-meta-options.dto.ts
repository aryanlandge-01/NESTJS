import { IsString, IsNotEmpty } from 'class-validator';


export class CreatePostMetaOptionsDto {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsString()
    @IsNotEmpty()
    value: any;
}