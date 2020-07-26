import { User } from "./schema.user";
import { IsEmail, Length, MinLength } from "class-validator";
import { ApolloError } from "apollo-server-express";
import { Query, Resolver, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";
import UserModel, { IUser } from './model.user';
import { Context } from '../common-types/context';
import mongoose from "mongoose";

@InputType()
class RegisterInput {
    @Field()
    @Length(1, 30)
    name: string;

    @Field()
    @IsEmail()
    @Length(1, 30)
    email: string;

    @Field()
    @MinLength(5)
    password: string; 
}

@Resolver(() => User)
export class UserResolver {
    @Query(() => String)
    sample(): String {
        return "Hello";
    }

    // @Query(() => UserSchema | isNullOrUndefined)
    // async me(): UserSchema | null | undefined {
    //     return await UserModel.findOne()
    // }
    @Mutation(() => User)
    async register(@Arg("options", () => RegisterInput) options: RegisterInput, @Ctx() { dbConn }: Context): Promise<User> {
        const User:mongoose.Model<IUser> = UserModel(dbConn);
        try {
            //const user = await User.create(options);
            const user = await User.create({
                ...options,
                created_on: new Date(),
                updated_on: new Date(),
            });
            console.log('user', user);
            return user;
        } catch(error) {
            console.error("> register error", error);
            throw new ApolloError("Error creating user");
        }

    }
}

