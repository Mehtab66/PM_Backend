import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // ⬅️ Add this
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { AgencySchema } from './schemas/agency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agency', schema: AgencySchema }]),
    JwtModule.register({ secret: 'yourSecretKey' }) // ⬅️ Register JwtModule
  ],
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [AgencyService],
})
export class AgencyModule {}
