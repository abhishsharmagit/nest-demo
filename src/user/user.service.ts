import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  getUser() {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log(error, 'error');
    }
  }
}
