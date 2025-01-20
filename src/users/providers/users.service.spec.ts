import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneGoogleIdProvider } from './find-one-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';



describe('UsersService', () => {
    let service: UsersService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
       providers: [
        UsersService,
        { provide: DataSource,useValue: {}},
        { provide: getRepositoryToken(User),useValue: {}},
        { provide: CreateGoogleUserProvider, useValue: {}},
        { provide: FindOneGoogleIdProvider, useValue: {}},
        { provide: FindOneUserByEmailProvider, useValue: {}},
        { provide: CreateUserProvider, useValue: {}},
        { provide: CreateUserProvider, useValue: {}}
       ],
    }).compile();

    service = module.get<UsersService>(UsersService)
  });

  


   it('should be defined.', () => {
       expect(service).toBeDefined();
   });
  
});
