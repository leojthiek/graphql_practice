// deleteTodoSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/app/graphQL/graphClient";
import { gql } from "@apollo/client";

interface DeleteTodoInput {
  id: string;
}

export const deleteTodoAction = createAsyncThunk(
  'delete/todo',
  async (deleteTodoInput: DeleteTodoInput, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation deleteTodoMutation($deleteTaskIput: deleteTaskIput!) {
            deleteTask(deleteTaskIput: $deleteTaskIput) {
              id
            }
          }
        `,
        variables: { deleteTaskIput: {id:deleteTodoInput.id} }
      });
      return response.data.deleteTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteTodoReducer = createSlice({
  name: "deleteTask",
  initialState: {
    deletedTask: null,
    loading: false,
    error: null as string | unknown
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedTask = action.payload;
      })
      .addCase(deleteTodoAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default deleteTodoReducer.reducer;
