import { BadRequestException, Inject, Injectable,RequestTimeoutException,forwardRef} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-param.dto';
import { AuthService } from 'src/auth/Provider/auth.service';
import { DataSource, In, Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UserCreateManyProvider } from './user-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneGoogleIdProvider } from './find-one-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interface/google-user.interface';

/**
 * Class to Connect to User Table and perform CRUD operations
 */
@Injectable()
export class UsersService{
    constructor(
        // Injecting the userRepository
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        // private readonly configService: ConfigService,

        // Inject module specific profile
        // @Inject(profileConfig.KEY)
        // private readonly profileConfiguration: ConfigType<typeof profileConfig>,
        
        /**
         * Injecting the usercreatManyProvider.
         */
        private readonly userCreateManyProvider: UserCreateManyProvider,
        
        // Injecting the createuser Provider.
        private readonly createUserProvider: CreateUserProvider,
        
        /**
         * Inject findonebyuseremailprovider
         */
        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

        /**
         * Inject Findonegoogleprovider
         */
        private readonly findonebygoogleIdProvider: FindOneGoogleIdProvider,

        /**
         * Inject createGoogleUserProvider
         */
        private readonly createGoogleUserProvider: CreateGoogleUserProvider,
    ){}

    /**
     * method to create user
     */
    public async createUser(createUserDto: CreateUserDto){
        return this.createUserProvider.createUser(createUserDto);
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

    /**
     * Method to createMany users for tranasction experimentation
     */
    public async createMany(createManyUsersDto: CreateManyUsersDto){
        return await this.userCreateManyProvider.createMany(createManyUsersDto);
    }
    
    /**
     * Proxy method to inject the findoneuserbyemailprovider copy
     */
    public async findOneByEmail(email: string){
        return await this.findOneUserByEmailProvider.findOneByEmail(email);
    }
    // Proxy method to inject the findonebygoogleid
    public async findOneByGoogleId(googleId: string){
        return await this.findonebygoogleIdProvider.findOneByGoogleId(googleId);
    }

    //proxy method to injec the creategoogleuserprovider
    public async createGoogleUser(googleUser: GoogleUser){
        return await this.createGoogleUserProvider.createGoogleUser(googleUser);
    }
}