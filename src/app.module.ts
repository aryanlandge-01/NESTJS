import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


const ENV = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);


@Module({
  imports: [
    UsersModule, 
    PostsModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development','.env']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
    useFactory: (configservice: ConfigService) => ({
      type: "postgres",
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true,
      port: configservice.get<number>("DATABASE_PORT"),
      username: configservice.get<string>("DATABASE_USER"),
      password: configservice.get<string>("DATABASE_PASSWORD"),
      host: configservice.get<string>("DATABASE_HOST"),
      database: configservice.get<string>("DATABASE_NAME")
    })
  }),
    TagsModule,
    MetaOptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
