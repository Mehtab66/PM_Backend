import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // ⬅️ Add this
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { AgencySchema } from './schemas/agency.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agency', schema: AgencySchema }]),
  JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),  ],
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [AgencyService],
})
export class AgencyModule {}
  