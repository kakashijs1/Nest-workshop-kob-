import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Company, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('/api/company')
export class CompanyController {
  @Post('create')
  async create(@Body() company: Company) {
    try {
      return await prisma.company.create({ data: company });
    } catch (e) {
      return { status: 500, message: e.message };
    }
  }

  @Get('info')
  async info() {
    try {
      return await prisma.company.findFirst();
    } catch (e) {
      return { status: 500, message: e.message };
    }
  }

  @Put('edit/:id')
  async edit(@Body() company: Company, @Param('id') id: string) {
    try {
      const idValue = parseInt(id);
      return await prisma.company.update({
        data: company,
        where: {
          id: idValue,
        },
      });
    } catch (e) {
      return { status: 500, message: e.message };
    }
  }
}
