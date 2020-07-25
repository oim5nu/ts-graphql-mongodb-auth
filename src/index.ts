import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";

import mongoose from "mongoose";

async function startServer() {
    require("dotenv").config();
    const schema = await buildSchema({
        resolvers: [HelloWorldResolver],
        emitSchemaFile: true,
    });

    const app = express();

    const MONGODB_USER = process.env.MONGODB_USER;
    const MONGODB_PASS = process.env.MONGODB_PASS;

    mongoose.connect(
        `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0-23rda.mongodb.net/test?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
        .then(() => {
            console.log("Mongodb is connected successfully");

            const server = new ApolloServer({
                schema,
                context: ({ req, res }) => ({req, res }),
            });
            
            server.applyMiddleware({ app, cors: false });
            const PORT = process.env.PORT;
            app.listen(PORT, () => {
                console.log(`Server is running on PORT: ${PORT}`)
            })
        })
        .catch(err => {
            console.log(err);
        })
}

startServer();