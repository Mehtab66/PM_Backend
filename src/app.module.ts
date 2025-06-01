import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {databaseConfiguration} from './config/dbConnection'
import {ConfigModule} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from "@nestjs/config";
import { AgencyModule } from './agency/agency.module';

@Module({
  imports: [    ConfigModule.forRoot({ isGlobal: true }),
MongooseModule.forRootAsync({
      imports: [ConfigModule],             // To use ConfigService
      inject: [ConfigService],             // Inject ConfigService into the function
      useFactory: databaseConfiguration,   // Use your function here
    }),


UserModule,


AgencyModule],



  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
