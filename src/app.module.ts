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
import appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { PaginationModule } from './common/pagination/pagination.module';

const ENV = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);


@Module({
  imports: [
    UsersModule, 
    PostsModule, 
    AuthModule,
    PaginationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development','.env']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig,databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
    useFactory: (configservice: ConfigService) => ({
      type: "postgres",
      // entities: [User],
      autoLoadEntities: configservice.get('database.autoLoadEntities'),
      synchronize: configservice.get('database.synchronize'),
      port: configservice.get<number>("database.port"),
      username: configservice.get<string>("database.user"),
      password: configservice.get<string>("database.password"),
      host: configservice.get<string>("database.host"),
      database: configservice.get<string>("database.name")
    })
  }),
    TagsModule,
    MetaOptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
