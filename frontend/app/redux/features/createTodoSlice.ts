import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/app/graphQL/graphClient";
import { gql } from "@apollo/client";

interface TodoData {
   task:string,
   startDate:string,
   endDate:string,
   user:string
}

export const createTodoAction = createAsyncThunk(
  'create/todo',
  async (formData:TodoData, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation createTodoMutation($createTaskInput: createTaskInput) {
            createTask(createTaskInput: $createTaskInput) {
              id
              task
              startDate,
              endDate
            }
          }
        `,
        variables: { createTaskInput: formData }
      });
      return response.data.createTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



const createTodoReducer = createSlice({
  name: "createTask",
  initialState:{
    task:null,
    loading:false,
    error:null as string | unknown
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(createTodoAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default createTodoReducer.reducer;
