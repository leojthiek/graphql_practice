import {configureStore} from '@reduxjs/toolkit'
import userRegisterReducer from "./features/userRegister"
import userLoginReducer from "./features/userLoginSlice"
import createTodoReducer from "./features/createTodoSlice"
import getTodoReducer from "./features/getTodoList"
import deleteTodoReducer from "./features/deleteTodoSlice"
import updateTaskReducer from "./features/updateTodoSlice"

const store = configureStore({
    reducer:{
      userRegister:userRegisterReducer,
      userLogin:userLoginReducer,
      createTodo:createTodoReducer,
      getTodo:getTodoReducer,
      deleteTodo:deleteTodoReducer,
      updateTask:updateTaskReducer,
    }
})
export default store
export type Rootstate = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch