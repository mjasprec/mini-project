import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmailService } from './email/email.service';
import { TokenSender } from './utils/sendToken';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  about: string;
  gender: string;
  birthday: Date;
  wallet: number;
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
      wallet,
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

    const user = {
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      about,
      gender,
      birthday,
      wallet,
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

    const {
      email,
      username,
      password,
      firstName,
      lastName,
      about,
      gender,
      birthday,
      wallet,
    } = newUser.user;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password,
        about,
        gender,
        birthday,
        wallet,
      },
    });

    return { user, response };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user && (await this.comparePassword(password, user.password))) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: 'Invalid email or password',
        },
      };
    }
  }

  async logout(req: any) {
    req.refreshtoken = null;
    req.accesstoken = null;
    req.user = null;
    return { message: 'Logged out successfully!' };
  }

  async getLoggedInUser(req: any) {
    const user = req.user;
    const accessToken = req.accesstoken;
    const refreshToken = req.refreshtoken;

    return { user, accessToken, refreshToken };
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
