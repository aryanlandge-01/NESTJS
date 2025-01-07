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





@Module({
  imports: [
    UsersModule, 
    PostsModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
    useFactory: () => ({
      type: "postgres",
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true,
      port: 5433,
      username: 'postgres',
      password: "Heil@007",
      host:'localhost',
      database: 'nestjs-blog'
    })
  }),
    TagsModule,
    MetaOptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
