import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Change platform colors arguments' })
class ChangePlatformColorsInput {
  @Field({ description: 'Primary color (HEX)' })
  primaryColor: string;

  @Field({ description: 'Secondary color (HEX)' })
  secondaryColor: string;
}

export { ChangePlatformColorsInput };
