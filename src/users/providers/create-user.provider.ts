import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-param.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/Provider/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {
    constructor(
        //inject the repository
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        

        // Inject hashingProvider it a circular dependency with authModule and Usermodule.
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ){}

    public async createUser(createUserDto: CreateUserDto){
        // check if user already in database
        let existingUser = undefined;

        try {
            existingUser = await this.usersRepository.findOne({
                where: {email: createUserDto.email},
            })
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later.',
                {
                    description: 'Error connecting to the database'
                },
            );
        }

        if (existingUser){
            throw new BadRequestException(
                'The user already exists, please check your email'
            )
        }

        // create a new user
        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password),
        });
        try{
            newUser = await this.usersRepository.save(newUser);
        }catch(error){
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later.',
                {
                    description: "Error Connecting to the database."
                }
            )
        }

        return newUser;
    }
}
