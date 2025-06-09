import { ApiProperty } from '@nestjs/swagger';
export class createAgencyDTO{

    @ApiProperty({
    description: 'Name of the agency',
    example: 'TravelEasy Agency',
  })



    username:string;

    @ApiProperty({
    description: 'Email of the agency',
    example: 'traveleasy@gmail.com',
  })
    email:string;

    @ApiProperty({
    description: 'password of the agency',
    example: 'TravelEasy@12',
  })
    password:string;
}