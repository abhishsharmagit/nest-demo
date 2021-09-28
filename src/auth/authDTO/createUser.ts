import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export class CreateUserDTO implements ICreateUserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
