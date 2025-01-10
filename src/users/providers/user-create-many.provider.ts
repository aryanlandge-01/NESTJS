import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UserCreateManyProvider {
    constructor(
        private readonly dataSource: DataSource,
    ){}


    public async createMany(createManyUsersDto: CreateManyUsersDto){
        let newUsers: User[] = [];
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            
            // connect this instance to a datasource
            await queryRunner.connect()
            // start transction
            await queryRunner.startTransaction()

        } catch (error) {
            throw new RequestTimeoutException('Could not connect to the database.')
        }
        // Need a query runner instance
        
        try {
            for (let user of createManyUsersDto.users){
                let newUser = queryRunner.manager.create(User,user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }
            // if successful commit
            await queryRunner.commitTransaction()
        } catch (error) {
            // if unsucessful rollback.
            await queryRunner.rollbackTransaction();
            throw new ConflictException('Could not complete the transction',{
                description: String(error)
            })

        } finally{
           // Realease a connection
           try {
            await queryRunner.release();
           } catch (error) {
            throw new RequestTimeoutException("Could not release the connection",{
                description: String(error)
            })
           }
        }
        
        return {users: newUsers};

    }
}
