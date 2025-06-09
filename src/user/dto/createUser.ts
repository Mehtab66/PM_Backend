import { ApiProperty } from "@nestjs/swagger";

export class createUserDto{
    @ApiProperty({
        description:"email for username",
        example:'mehtab@gmail.com'
    })
email:string;
  @ApiProperty({
        description:"username for username",
        example:'mehtab1'
    })
username:string;
  @ApiProperty({
        description:"password for user",
        example:'mehtab@123'
    })
password:String

}