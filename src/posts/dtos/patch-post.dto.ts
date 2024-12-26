// import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty,PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class PatchPostDto extends PartialType(CreatePostDto){
    @ApiProperty({
        description: 'The ID of the post to be updated',
        required: true
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}