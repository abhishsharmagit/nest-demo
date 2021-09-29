import { Controller, Get, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwtAuthGuard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @UseGuards(JWTAuthGuard)
  @Get("user")
  getUser(){
      return this.userService.getUser("6152be634213dd5d6364f1ff")
  }
}
