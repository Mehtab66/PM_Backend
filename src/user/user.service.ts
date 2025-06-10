import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from './dto/createUser';
import * as bcrypt from 'bcrypt';  
import { loginDto } from './dto/loginUser';
@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<userDocument>,private jwtService:JwtService){}

    //creating User
async createUser(createUser:createUserDto):Promise<User>{
    const checkEmail=await this.userModel.findOne({email:createUser.email})
    if(checkEmail){
        throw new ConflictException('this email is already linked with another user, Please try another email')
    }
    const checkUsername=await this.userModel.findOne({username:createUser.username})
 if(checkUsername){
        throw new ConflictException('this email is already linked with another user, Please try another email')
    }
    const hashedPassword=await bcrypt.hash(createUser.password,10);
    const user=new this.userModel({...createUser,password:hashedPassword})
user.save()
return user
}



//log in USer
async loginUser(loginUser:loginDto){
    const user = await this.userModel.findOne({
      $or: [
        { email: loginUser.email },
        { username: loginUser.username },
      ],
    });
    if(!user){
        throw new UnauthorizedException('Invalid Credentials')
    }
       const isMatch = await bcrypt.compare(loginUser.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    
        const payload = { sub: user._id, email: user.email, username: user.username };
        const token = this.jwtService.sign(payload);
        return{token,user}
}

}

