import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/app/graphQL/graphClient";
import { gql } from "@apollo/client";

interface TodoData {
 taskId:string
  task: string;
  startDate: string;
  endDate: string;
}

interface UpdateTodoData {
  updateTaskInput: TodoData;
}

export const updateTodoAction = createAsyncThunk(
  'update/todo',
  async ({ updateTaskInput }: UpdateTodoData, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation updateTodoMutation($updateTaskInput: updateTaskInput) {
            updateTask( updateTaskInput: $updateTaskInput) {
              id
              task
              startDate
              endDate
            }
          }
        `,
        variables: { updateTaskInput }
      });
      return response.data.updateTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const updateTaskReducer = createSlice({
  name: "updateTask",
  initialState: {
    updateTodo: null,
    loading: false,
    error: null as string | unknown
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTodoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.updateTodo = action.payload;
      })
      .addCase(updateTodoAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default updateTaskReducer.reducer;
