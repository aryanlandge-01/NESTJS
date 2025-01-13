import { Injectable ,forwardRef,Inject} from "@nestjs/common";
import { SignInDto } from "../dtos/signin.dto";
import { UsersService } from "src/users/providers/users.service";
import { SignInProvider } from "./sign-in.provider";






@Injectable()
export class AuthService{
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        // private readonly hashingProvider: HashingProvider,
        private readonly signInProvider: SignInProvider,
    ){}


    public async signIn(signInDto: SignInDto){
        // console.log(signInDto)
    //    const user = this.usersService.findOneByEmail(signInDto.email);
    //    const userName = signInDto.email;
       return this.signInProvider.signIn(signInDto);
    }

    // public async getUser(id: number){
    //    const user = this.usersService.findOneById(id)
    //    return user;
    // }

    public isAuth(){
        return true;
    }

}