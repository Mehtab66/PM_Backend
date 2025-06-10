import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'User',schema:userSchema}]),
JwtModule.registerAsync({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(configservice:ConfigService)=>({
            secret: configservice.get<string>('JWT_SECRET'),

  })
})
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
