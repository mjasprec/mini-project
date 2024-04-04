import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { Response } from 'express';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    registerDto: RegisterDto,
    // response: Response
  ) {
    const { firstName, lastName, email, userName, password } = registerDto;

    const newUser = {
      firstName,
      lastName,
      email,
      userName,
      password,
    };

    return newUser;
  }

  async login(loginDto: LoginDto) {
    const { userName, password } = loginDto;

    const user = {
      userName,
      password,
    };

    return user;
  }

  async getUsers() {
    const users = [
      {
        id: 1,
        firstName: 'Leanne Graham',
        lastName: '',
        username: 'Bret',
        email: 'Sincere@april.biz',
        password: '',
      },
      {
        id: 2,
        firstName: 'Ervin',
        lastName: 'Graham',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        password: '',
      },
    ];

    return users;
  }
}
