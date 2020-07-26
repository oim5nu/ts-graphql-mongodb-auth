import { Field, ObjectType, ID } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@ObjectType({ description: "User Schema"})
export class User {
    @Field(() => ID)
    _id: string

    @Field()
    @Length(1, 30)
    name: string

    @Field()
    @IsEmail()
    @Length(1, 30)
    email: string

    password: string  // it won't get populated

    @Field()
    created_on: Date;
    
    @Field()
    updated_on: Date;
}