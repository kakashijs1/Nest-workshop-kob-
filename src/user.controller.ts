import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('list')
  async list() {
    try {
      return await prisma.user.findMany();
    } catch (e) {
      return { status: 500, message: e.message };
    }
  }

  @Post('create')
  async create(@Body() user: User) {
    try {
      return await prisma.user.create({ data: user });
    } catch (e) {
      return { status: 500, message: e.message };
    }
  }

  @Put('edit/:id')
  async edit(@Body() user: User, @Param('id') id: string) {
    try {
      const idValue = parseInt(id);
      return await prisma.user.update({ data: user, where: { id: idValue } });
    } catch (e) {
      return { status: 500, message: e.message };
    }
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    try {
      const idValue = parseInt(id);
      return await prisma.user.delete({ where: { id: idValue } });
    } catch (e) {
      return { status: 500, message: e.message };
    }
  }

  @Post('login')
  async login(@Body() user: { usr: string; pwd: string }) {
    try {
      const userData = await prisma.user.findFirst({
        where: {
          user: user.usr,
          pwd: user.pwd,
        },
      });

      if (userData) {
        const token = await this.authService.login(userData);
        return { token: token };
      }

      throw new UnauthorizedException('username or password invalid');
    } catch (e) {
      return { message: e.message };
    }
  }

  @Get('info')
  async info(@Headers('Authorization') auth: string) {
    try {
      const jwt = auth.replace('Bearer', '');
      const payload = this.jwtService.decode(jwt);

      return { payload: payload };
    } catch (e) {
      return { message: e.message };
    }
  }
}
