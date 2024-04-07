import { ObjectType, Field, Directive } from '@nestjs/graphql';

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
@Directive('@key(fields:"id")')
export class Comment {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  nftId: string;

  @Field()
  userId: string;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class Nft {
  @Field()
  id: string;

  @Field()
  imgUrl: string;

  @Field()
  userId: string;

  @Field()
  price: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Comment, { nullable: true })
  comments?: Comment | null;
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

  @Field(() => Nft, { nullable: true })
  nfts?: Nft | null;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
