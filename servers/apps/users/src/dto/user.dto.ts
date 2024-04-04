import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString({ message: 'First name needs to be a string.' })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;

  @Field()
  @IsNotEmpty({ message: 'Username is required.' })
  @MinLength(6, { message: 'Username must be at least 6 characters' })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is invalid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Username is required.' })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
