import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwtAuthGuard';
import { UpdateUserDTO } from './userDTO/updateUserDto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdatePasswordDTO } from './userDTO';
import { AuthService } from 'src/auth/auth.service';
const bcrypt = require('bcrypt');

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @UseGuards(JWTAuthGuard)
  @Get('user')
  getUser(@Request() req) {
    return this.userService.getUser();
  }

  @Put('update')
  async updateUser(
    @Body() updateUserDto: UpdateUserDTO,
    @Request() req,
  ): Promise<User> {
    return this.userService.updateUser(updateUserDto, req.id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }

  @Patch('updatePassword')
  async updatePassword(@Body() dto: UpdatePasswordDTO) {
    const user = await this.authService.findUserByEmail(dto.email);
    if (user) {
      const oldHashedPassword = await bcrypt.hash(dto.oldPassword, 10);
      if ((await user).password !== oldHashedPassword) {
        throw new BadGatewayException('password does not match');
      }
      const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);
      this.userService.updatePassword(user.id, newHashedPassword);
    }
  }
}
