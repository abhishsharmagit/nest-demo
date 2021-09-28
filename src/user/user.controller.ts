import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @Get("user")
  getUser(){
      return this.userService.getUser("6152be634213dd5d6364f1ff")
  }
}
