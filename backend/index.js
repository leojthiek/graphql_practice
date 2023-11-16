import {ApolloServer} from "@apollo/server"
import { userTypeDefs } from "./schema/schema.js"
import { todoTypeDes } from "./schema/todoTypeDefs.js"
import {startStandaloneServer} from '@apollo/server/standalone'
import Db from "./utils/db_connection.js"
import { UserResolvers } from "./resolvers/userResolver.js"
import {makeExecutableSchema} from '@graphql-tools/schema'
import { todoResolver } from "./resolvers/todoresolver.js"

Db()


const schema = makeExecutableSchema({
typeDefs:[userTypeDefs,todoTypeDes],
resolvers: [UserResolvers,todoResolver]
})

const server = new ApolloServer({schema})

const {url} = await startStandaloneServer(server,{
    listen:{port:4000}
})

console.log(`sever up and running at port ${url}`)