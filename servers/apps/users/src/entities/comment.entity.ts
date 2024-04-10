import { Directive, Field, ObjectType } from '@nestjs/graphql';

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
