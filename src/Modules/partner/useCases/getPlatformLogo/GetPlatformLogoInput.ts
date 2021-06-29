import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Get partner platform logo query arguments' })
class GetPlatformLogoInput {
  @Field()
  partnerID: string;
}

export { GetPlatformLogoInput };
