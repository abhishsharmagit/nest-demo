import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface IUpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export class UpdateUserDTO implements IUpdateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

}
