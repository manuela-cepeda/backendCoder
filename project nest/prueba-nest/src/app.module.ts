import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
     ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: async(config:ConfigService) => ({
    uri:config.get<string>('MONGO_URL')
  })
  })] ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
