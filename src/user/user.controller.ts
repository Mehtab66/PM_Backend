import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser';
import { loginDto } from './dto/loginUser';


@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    //create User 
    @Post('createUser')
    @ApiOperation({summary:'create User'})
    @ApiBody({type:loginDto
        
    })
    async createUser(@Body() createUser:createUserDto){
        return this.userService.createUser(createUser)
    }


    //LoginUser
    @Post('loginUser')
    async loginUser(@Body() loginUser:loginDto){
        return this.userService.loginUser(loginUser)
    }
}
