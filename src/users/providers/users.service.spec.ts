import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneGoogleIdProvider } from './find-one-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UserCreateManyProvider } from './user-create-many.provider';
import { create } from 'domain';
import { CreateUserDto } from '../dtos/create-user.dto';



describe('UsersService', () => {
    let service: UsersService;


  beforeEach(async () => {

   const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) => 
         Promise.resolve({
            id: 12,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: createUserDto.password
         })
   
   };

    
   const module: TestingModule = await Test.createTestingModule({
       providers: [
        UsersService,
        { provide: CreateUserProvider, useValue: {mockCreateUserProvider}},
        { provide: DataSource,useValue: {}},
        { provide: getRepositoryToken(User),useValue: {}},
        { provide: CreateGoogleUserProvider, useValue: {}},
        { provide: FindOneGoogleIdProvider, useValue: {}},
        { provide: FindOneUserByEmailProvider, useValue: {}},
        { provide: UserCreateManyProvider, useValue: {}}
       ],
   }).compile();

   service = module.get<UsersService>(UsersService)
   });

   it('should be defined.', () => {
      expect(service).toBeDefined();
   });

   describe('createUser',() => {

      it('should be defined',() => {
         expect(service.createUser).toBeDefined();
      });

      // it('should call createUser on CreateUserProvider', async () => {
      //    let user = await service.createUser({
      //       firstName: 'Jhon',
      //       lastName: 'Doe',
      //       email: 'john@doe.com',
      //       password: 'password'
      //    });
      //    expect(user.lastName).toEqual('Doe')
      // });
   })
  
});
