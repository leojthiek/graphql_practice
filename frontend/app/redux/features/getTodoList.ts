import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/app/graphQL/graphClient";
import { gql } from "@apollo/client";



export const getTodoListAction = createAsyncThunk(
  'get/todo',
  async (userId:string, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          query getTodoTask($userId: ID!) {
            findTask(userId : $userId) {
              id
              task
              startDate,
              endDate
            }
          }
        `,
        variables: { userId:userId }
      });
      return response.data.findTask;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



interface Task {
    id:string
    task:string,
    startDate:string,
    endDate:string
  }


const gettodoReducer = createSlice({
  name: "getTodo",
  initialState:{
    task:[] as Task[],
    loading:false,
    error:null as string | unknown
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodoListAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodoListAction.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(getTodoListAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default gettodoReducer.reducer;
