export const userTypeDefs = `#graphql
   type User {
    id:ID!,
    name:String!,
    email:String!
    password:String!
   }


   type Query {
     findUsers:[User]
     findOneUser(id:ID!):User
   }

   input createUserInput {
      name:String!
      email:String!
      password:String!
   }

   input createLoginInput {
      email:String!
      password:String!
   }

   type Mutation {
      createUser(createUserInput:createUserInput): User
      loginUser(createLoginInput:createLoginInput):User
   }



`