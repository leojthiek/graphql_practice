export const todoTypeDes = `#graphql
  
   type Task {
      id:ID!,
      task:String!
      startDate:String!
      endDate:String!
      user:ID!
   }


   type Query {
     findTask(userId:ID!):[Task]
   }

   input createTaskInput{
    task:String!
    startDate:String!
    endDate:String!
    user:ID!
   }

   input updateTaskInput{
      taskId:ID!
    task:String
    startDate:String
    endDate:String
   }

   input deleteTaskIput{
      id:ID!
   }

   type Mutation {
    createTask(createTaskInput:createTaskInput):Task
    updateTask(updateTaskInput:updateTaskInput):Task
    deleteTask(deleteTaskIput:deleteTaskIput):Task
   }

`
