import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './authDTO/createUser';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDTO) {
    return this.authService.signUp(dto);
  }

//   @Post('login')
//   async login(@Request() request) {
//     return this.authService.login(request.user);
//   }
}
