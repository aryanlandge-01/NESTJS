import { 
    IsString, 
    IsNumber, 
    IsOptional, 
    IsInt 
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
    @ApiPropertyOptional({
        description: 'The id of the user to get',
        example: 123,
        type: Number
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id?: number;
}