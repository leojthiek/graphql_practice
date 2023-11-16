import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/app/graphQL/graphClient";
import { gql } from "@apollo/client";

interface UserData {
  email: string;
  password: string;
  name: string;
}

export const registerUserAction = createAsyncThunk(
  'user/register',
  async (formData:UserData, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation createUserMutation($createUserInput: createUserInput) {
            createUser(createUserInput: $createUserInput) {
              id
              name
              email
            }
          }
        `,
        variables: { createUserInput: formData }
      });
      return response.data.createUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



const userRegister = createSlice({
  name: "registerUser",
  initialState:{
    registerUser:null,
    loading:false,
    error:null as string | unknown
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = action.payload;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userRegister.reducer;
