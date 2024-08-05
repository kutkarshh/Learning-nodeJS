const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

async function startServer() {
    const PORT = 3000;
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    const server = new ApolloServer({
        typeDefs: `
            type Todo{
                id:ID!
                title:String!
                completed:Boolean
            }

            type Query{
                getTodos:[Todo]
            }
        `,

        // Query: {   this is hardcoded data
        //     getTodos: () => {
        //         return [
        //             { id: 1, title: "Todo 1", completed: false },
        //             { id: 2, title: "Todo 2", completed: false },
        //             { id: 3, title: "Todo 3", completed: false },
        //         ];
        //     }
        // }
        resolvers: {
            Query: {
                getTodos: async () => {
                    return (await axios.get("https://jsonplaceholder.typicode.com/todos")).data
                }
            }
        }
    });



    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
}

startServer();