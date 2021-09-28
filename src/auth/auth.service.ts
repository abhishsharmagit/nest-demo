import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './authDTO/createUser';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(dto: CreateUserDTO) {
    try {
      const user = this.userRepository.findOne(dto.email);
      console.log(user, 'user')
      if (user) {
        throw 'user alraedy exist';
      }
      const hashedPassword: string = await bcrypt.hash(dto.password, 10);
      const userEntity = this.userRepository.create({
        ...dto,
        password: hashedPassword,
      });
     return await this.userRepository.save(userEntity);
     
    } catch (error) {
        console.log(error)
    }
  }

//   async login(user) {
//       try{

//       }catch(error){

//       }
//   }
}
