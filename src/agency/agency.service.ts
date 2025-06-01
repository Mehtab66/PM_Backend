import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AgencyDocument,Agency } from './schemas/agency.schema';
import { createAgencyDTO } from './dto/createAgencyDTO';
import { loginAgencyDTO } from './dto/loginAgencyDTO';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';  
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AgencyService {

    constructor(@InjectModel(Agency.name) private agencyModel:Model<AgencyDocument>,
    private jwtService: JwtService
){}

async registerAgency(createAgency:createAgencyDTO):Promise<Agency>{
    const checkAgency=await this.agencyModel.findOne({email:createAgency.email})
    if (checkAgency){
        throw new ConflictException('This email is already linked with another agency')
    }
    const hashedPassword=await bcrypt.hash(createAgency.password,10)
    const agency= new this.agencyModel({...createAgency,hashedPassword})
    agency.save()
    return agency
}
async login(loginDto: loginAgencyDTO) {
    const agency = await this.agencyModel.findOne({
      $or: [
        { email: loginDto.identifier },
        { username: loginDto.identifier },
      ],
    });
    if (!agency) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(loginDto.password, agency.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: agency._id, email: agency.email, username: agency.username };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
