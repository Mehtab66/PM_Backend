import { Body, Controller, Post } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { createAgencyDTO } from './dto/createAgencyDTO';
import { loginAgencyDTO } from './dto/loginAgencyDTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';


@ApiTags('Agency') // Groups endpoints under "Agency" in Swagger UI
@Controller('agency')
export class AgencyController {
    constructor (private readonly agencyService:AgencyService){
            console.log('AgencyController initialized'); // 👈 Add this

    }
    @Post('registerAgency')
    @ApiOperation({ summary: 'Register a new agency' })
  @ApiBody({ type: createAgencyDTO })
  @ApiResponse({
    status: 201,
    description: 'Agency successfully registered',
    type: createAgencyDTO, // Adjust if response differs (e.g., includes ID)
  })
    async register (@Body() createAgencyDTO:createAgencyDTO){
        return this.agencyService.registerAgency(createAgencyDTO);
    }
    @Post('login')
    @ApiOperation({ summary: 'Log in an agency' })
  @ApiBody({ type: loginAgencyDTO })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns access token',
    schema: {
      example: { accessToken: 'jwt-token-here' }, // Adjust based on actual response
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: loginAgencyDTO) {
    return this.agencyService.login(loginDto);
  }
}
