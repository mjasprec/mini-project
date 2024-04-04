import { BadRequestException } from '@nestjs/common';
import {
  Args,
  // Context,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RegisterResponse } from './types/user.types';
import { RegisterDto } from './dto/user.dto';
import { User } from './entities/user.entity';
// import { Response } from 'express';

@Resolver('User')
// @UseFilters
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    // @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.username || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }

    const user = await this.userService.register(
      registerDto,
      // context.res,
    );

    return { user };
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
