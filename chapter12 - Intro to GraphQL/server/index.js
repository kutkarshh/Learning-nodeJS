const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
    const PORT = 3000;
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    const typeDefs = `
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
        }

        type Query {
            getTodos: [Todo]
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
        Query: {
            getTodos: async () => {
                try {
                    console.log("Fetching todos...");
                    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                    console.log("Response received:", response.data);
                    return response.data;
                } catch (error) {
                    console.error("Error fetching todos:", error);
                    throw new Error("Failed to fetch todos");
                }
            },
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