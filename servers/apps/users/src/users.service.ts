import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
    const { firstName, lastName, email, username, password } = registerDto;

    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password,
      },
    });

    return { user, response };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = {
      username,
      password,
    };

    return user;
  }

  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
