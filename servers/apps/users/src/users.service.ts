import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmailService } from './email/email.service';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      about,
      gender,
      birthday,
    } = registerDto;

    const isEmailExist = await this.prisma.user.findUnique({
      where: { email },
    });

    const isUsernameExist = await this.prisma.user.findUnique({
      where: { username },
    });

    if (isUsernameExist || isEmailExist) {
      throw new BadRequestException('Username/Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultBalance = 10000;

    const user = {
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      about,
      gender,
      birthday,
      wallet: defaultBalance,
    };

    const activationToken = await this.createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const activation_token = activationToken.token;

    await this.emailService.sendMail({
      email,
      subject: 'Activate your account',
      template: './activation-email',
      name: `${firstName} ${lastName}`,
      activationCode,
    });

    return { activation_token, response };
  }

  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 900).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;

    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('Invalid activation code');
    }

    const { email, username, password, firstName, lastName } = newUser.user;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    const user = await this.prisma.user.create({
      data: { firstName, lastName, email, username, password },
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
