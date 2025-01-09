import { BadRequestException, Inject, Injectable,RequestTimeoutException,forwardRef} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from 'src/auth/Provider/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

/**
 * Class to Connect to User Table and perform CRUD operations
 */
@Injectable()
export class UsersService{
    constructor(
        // Injecting the userRepository
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        private readonly configService: ConfigService,

        // Inject module specific profile
        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>
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

        let newUser = this.usersRepository.create(createUserDto);
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

    /**
     * Method to get all users from the database
     */
    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number 
    ) {
        // console.log(this.profileConfiguration)
        return  [
            { 
              name: 'John',
              email: 'jhon@gmail.com' 
            },
            { 
              name: 'Alice', 
              email: 'alice@gmail.com'
            },
        ];
    }
    
    /**
     * Method to get a single user by Id
    */
    public async findOneById(id: number){

       let user = undefined;
       try {
            user =await this.usersRepository.findOneBy({
                id,
           });
       } catch (error) {
           throw new RequestTimeoutException(
              'Unable to process your reauest at the moment please try again later.',
              {
                description: 'Error connecting to the database.'
              }
           )
       }
       if (!user){
          throw new BadRequestException('user not found.')
       }
       return user
    }

}