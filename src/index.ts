import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";

require("dotenv").config();

import { HelloWorldResolver } from "./helloworld/helloworld-resolver";
import { UserResolver } from "./authentication/resolver.user";
import { getConnection } from "./db-conn";

async function startServer() {

    // Start graphql server
    const schema = await buildSchema({
        resolvers: [HelloWorldResolver, UserResolver],
        emitSchemaFile: true,
    });

    const server = new ApolloServer({
        schema,
        context: async ({req, res}) => {
            const dbConn = await getConnection();
    
            return { req, res, dbConn };
        },
        playground: true,
        introspection: true
    });    

    // Start mongoDB
    //await connectMongoDB();

    const app = express();

    // app.use((req, _, next) => {
    //     //console.log(req.headers);
    //     next();
    // })

    server.applyMiddleware({ app, path: "/api/graphql", cors: false });
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
}

startServer();