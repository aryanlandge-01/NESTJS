import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserData } from '../interfaces/active-user.interface';

@Injectable()
export class RefreshTokensProvider {
    constructor(
       private readonly jwtService: JwtService,

       @Inject(jwtConfig.KEY)
       private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
       
       @Inject(forwardRef(() => UsersService))
       private readonly usersService: UsersService,

       private readonly generateTokenProvider: GenerateTokensProvider,
    ){}

    public async refreshTokens(refreshTokenDto: RefreshTokenDto){

        try {
            // verify the refresh token using jwtService
            const {sub} = await this.jwtService.verifyAsync<Pick<ActiveUserData,'sub'>>(refreshTokenDto.refreshToken,{
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            })

            // fetch user from the database aka userservice
            const user = await this.usersService.findOneById(sub);
            
            // create a token or generate
            return await this.generateTokenProvider.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException(error,{
                description: "Unauthorized access."
            })
        }
       
    }
}
