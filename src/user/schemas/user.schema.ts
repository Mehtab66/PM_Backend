import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export  type userDocument=User & Document
@Schema({timestamps:true})
export class User{
    @Prop({required:true,unique:true})
    email:string
    @Prop({required:true,unique:true})
    username:string
    @Prop({required:true,})
    password:string
}
export const userSchema=SchemaFactory.createForClass(User)