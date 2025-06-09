import { Body, Controller, Post } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { createAgencyDTO } from './dto/createAgencyDTO';
import { loginAgencyDTO } from './dto/loginAgencyDTO';

@Controller('agency')
export class AgencyController {
    constructor (private readonly agencyService:AgencyService){
            console.log('AgencyController initialized'); // 👈 Add this

    }
    @Post('registerAgency')
    async register (@Body() createAgencyDTO:createAgencyDTO){
        return this.agencyService.registerAgency(createAgencyDTO);
    }
    @Post('login')
  async login(@Body() loginDto: loginAgencyDTO) {
    return this.agencyService.login(loginDto);
  }
}
