import { Injectable ,forwardRef,Inject} from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";


@Injectable()
export class AuthService{
    constructor(
        // Injectin users Service
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ){

    }
    public login (email: string, password: string,id: string){
    // user exists dataase
    //loin
    // token
    // const user = this.usersService.findOneById();
    return "sample_token";
    }

    public isAuth(){
        return true;
    }

}