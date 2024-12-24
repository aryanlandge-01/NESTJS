import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
    // Injecting the UsersService intermodular dependency
    constructor(private readonly userService: UsersService) {}
    public findAll(userId: string){
        // User.service
        const user = this.userService.findOneById(userId);
    
        return [
            {   
                user: user,
                title: "Post 1",
                content: "Content 1",
            },
            {   
                user: user,
                title: "Post 2",
                content: "Content 2",
            }
        ]
    }
}
