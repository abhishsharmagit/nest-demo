import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface IUpdatePasswordDTO {
  newPassword: string;
  oldPassword: string;
  email: string;
}

export class UpdatePasswordDTO implements IUpdatePasswordDTO {
  @IsString()
  newPassword: string;
  @IsString()
  oldPassword: string;
  @IsEmail()
  email: string;
}
