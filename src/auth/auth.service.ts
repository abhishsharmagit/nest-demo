import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './authDTO/createUser';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDTO) {
    try {
      const hashedPassword: string = await bcrypt.hash(dto.password, 10);
      const userEntity = this.userRepository.create({
        ...dto,
        password: hashedPassword,
      });
      await this.userRepository.save(userEntity);
      return this.login(userEntity);
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
 
    const user = await this.userRepository.findOne({email});

    if (!user) {
      throw new NotFoundException('cant find user');
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new UnauthorizedException(
        'password is incorrect. Please try again.',
      );
    }

    return user;
  }

  async login(user: User) {
    const payload = { name: user.firstName, lastName: user.lastName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
