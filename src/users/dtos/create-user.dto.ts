import { 
    IsEmail, 
    IsNotEmpty, 
    IsOptional, 
    IsString,  
    Matches,  
    MaxLength,  
    MinLength } 
from "class-validator";




export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    firstName: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastName?: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(96)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(96)
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        {
        message: 'Mininum 8 character,1 letter,1 number,1 special character.'
        }
    )
    password: string
}