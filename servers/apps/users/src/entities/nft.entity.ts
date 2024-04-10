import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.entity';

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
