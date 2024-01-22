import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { prismaClient } from "../clients/db";
// import { graphql } from "graphql";
// import cors from 'cors';


export async function initServer () {
    const app = express();

    app.use(bodyParser.json());



    app.get("/", (req, res) =>
    res.status(200).json({ message: "Everything is good" })
  );


    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                sayHello : String
            }
        `,
        resolvers: {
            Query : {
                sayHello: () => `Hello from GraphQL Server`
            }
        },
    });

    await graphqlServer.start();

    app.use('/graphql', expressMiddleware(graphqlServer));

    return app;

}
