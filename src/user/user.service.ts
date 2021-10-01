import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ObjectID, Repository } from 'typeorm';
import { UpdateUserDTO } from './userDTO/updateUserDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getUser() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error, 'error');
    }
  }
  async updateUser(dto: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.authService.findUserByEmail(dto.email);

      if (!user) {
        throw new ForbiddenException('user not found');
      }
      await this.userRepository.update({ id: user.id }, dto);
      return this.userRepository.findOne({ id: user.id });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string): Promise<string> {
    await this.userRepository.delete({ id });
    return 'deleted successfully';
  }

  async updatePassword(id: string, password: string) {
    return await this.userRepository.update({ id }, { password });
  }
}
