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
import { Lotto, PrismaClient } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Controller('/api/lotto')
export class LottoController {
  @Post('create')
  async create(@Body() lotto: Lotto) {
    if (!lotto.roundNumber) {
      throw new Error('roundNumber must not be null');
    }

    const res = await prisma.lotto.create({
      data: lotto,
    });
    return { result: res };
  }

  @Get('list')
  async list() {
    return { results: await prisma.lotto.findMany() };
  }

  @Delete('remove/:id')
  async remove(@Param('id') paramId: string) {
    const id = parseInt(paramId);
    const res = await prisma.lotto.delete({ where: { id: id } });
    return { result: res };
  }

  @Put('edit/:id')
  async edit(@Body() lotto: Lotto, @Param('id') id: string) {
    return {
      result: await prisma.lotto.update({
        data: lotto,
        where: { id: parseInt(id) },
      }),
    };
  }
}
