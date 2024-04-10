import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Nft } from './nft.entity';

@ObjectType()
@Directive('@key(fields:"id")')
export class Avatars {
  @Field()
  id: string;

  @Field()
  public_id: string;

  @Field()
  url: string;

  @Field()
  userId: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Avatars, { nullable: true })
  avatar?: Avatars | null;

  @Field()
  about: string;

  @Field(() => String, { defaultValue: 'male' })
  gender: string;

  @Field()
  birthday?: Date;

  @Field()
  wallet: number;

  @Field(() => [Nft], { nullable: 'items' })
  nfts: Nft[];

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
