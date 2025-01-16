import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/Provider/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit{
    private oauthClient: OAuth2Client;

    constructor(
        /**
         * Inject jwtconfiguration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        
        /**
         * Inject the userservice
         */
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        /**
         * Inject generateTokenprovider
         */
        private readonly generateTokensProvider: GenerateTokensProvider,
    ){}

    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new OAuth2Client(clientId,clientSecret);
    }

    public async authenticate(gooleTokenDto: GoogleTokenDto){
        // verify the google token sent by user.
        const loginTicket = await this.oauthClient.verifyIdToken({
            idToken: gooleTokenDto.token,
        });

        // extract the payload from google jwt
        const {email,sub: googleId} = loginTicket.getPayload();

        // find the user in the database by googleId
        const user = await this.usersService.findOneByGoogleId(googleId);

        // if the googleid exist generate tokens
        if(user){
            return this.generateTokensProvider.generateTokens(user);
        }

        // if not create a new user first then generate tokens
        
        // throw unauthorized exception.
    }
}
