const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
    const PORT = 4000;
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    const typeDefs = `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }
    `;

    // Query: {   this is hardcoded data
    //     getTodos: () => {
    //         return [
    //             { id: 1, title: "Todo 1", completed: false },
    //             { id: 2, title: "Todo 2", completed: false },
    //             { id: 3, title: "Todo 3", completed: false },
    //         ];
    //     }
    // }

    const resolvers = {

        Todo: {
            user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
        },

        Query: {
            getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,

            getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

            getUser: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
        },
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
}

startServer();