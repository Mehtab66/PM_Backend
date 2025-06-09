import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";

export class loginDto{
    @ApiProperty({
        description:'Email of the user',
        example:'mehtab@gmail.com'
    })
    @IsOptional()
    @IsEmail()
    email:string

     @ApiProperty({
        description: 'username  of the agency',
        example: 'Travel Agency',
      })
    @IsOptional()
      username?: string; // Optional username
@ApiProperty({
  description:"password",
  example:'mehtab@123',
})
      password:string
    
    
    }