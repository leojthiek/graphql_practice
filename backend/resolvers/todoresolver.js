import Todo from "../models/todoModel.js"

export const todoResolver = {
  Query: {
    findTask: async (_, { userId }) => {
      try {
        const userTodoList = await Todo.find({ user: userId })
        return userTodoList
      } catch (error) {
        console.log(error)
        throw new Error("failed to find user todo list")
      }
    },
  },

  Mutation: {
    createTask: async (_, { createTaskInput }) => {
      try {
        const { task, startDate, endDate, user } = createTaskInput
        const todolist = new Todo({
          task,
          startDate,
          endDate,
          user,
        })
        await todolist.save()
        return todolist
      } catch (error) {
        console.log(error)
        throw new Error("Failed to create todo")
      }
    },
    updateTask: async (_, { updateTaskInput }) => {
      const { taskId, ...updateFields } = updateTaskInput

      try {
        const updatedTask = await Todo.findByIdAndUpdate(
          taskId,
          { $set: updateFields },
          { new: true }
        )
        return updatedTask
      } catch (error) {
        console.log(error)
        throw new Error("Failed to update task")
      }
    },
    deleteTask:async(_,{deleteTaskIput})=>{
        try {
            const {id} = deleteTaskIput 
            const taskDelete = await Todo.findByIdAndDelete(id)
            return taskDelete
        } catch (error) {
            console.log(error)
            throw new Error("failed to delete task")
        }
    }
  },
}
