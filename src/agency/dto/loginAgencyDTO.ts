import { IsEmail, IsOptional, validate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class loginAgencyDTO{
  @ApiProperty({
    description: 'Email address of the agency',
    example: 'contact@traveleasy.com',
  })
@IsOptional()
@IsEmail()
email?:string;


 @ApiProperty({
    description: 'username  of the agency',
    example: 'Travel Agency',
  })
@IsOptional()
  username?: string; // Optional username

   @ApiProperty({
    description: 'Password  of the agency',
    example: 'travel@123',
  })
password:string;
validate() {
    if (!this.email && !this.username) {
      throw new Error('Either email or username must be provided');
    }
  }
}