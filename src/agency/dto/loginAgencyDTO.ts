import { IsEmail, IsOptional } from "class-validator";

export class loginAgencyDTO{
@IsOptional()
@IsEmail()
email?:string;

@IsOptional()
  username?: string; // Optional username
password;
    identifier: unknown;
validate() {
    if (!this.email && !this.username) {
      throw new Error('Either email or username must be provided');
    }
  }
}