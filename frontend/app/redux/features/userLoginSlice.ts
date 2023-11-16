import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/app/graphQL/graphClient";
import { gql } from "@apollo/client";

interface UserData {
  email: string;
  password: string;
}



export const loginUserAction = createAsyncThunk(
  'user/login',
  async (formData:UserData, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation userLoginMutation($createLoginInput: createLoginInput) {
            loginUser(createLoginInput: $createLoginInput) {
              id
              name
              email
            }
          }
        `,
        variables: { createLoginInput: formData }
      });
      localStorage.setItem('graphqlUser',JSON.stringify(response.data.loginUser))
      return response.data.loginUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


const userFromLocalstorage = typeof window !==  "undefined" ? localStorage.getItem("graphqlUser") : null

const initialState = {
  user:userFromLocalstorage ? JSON.parse(userFromLocalstorage) : null,
  loading:false,
  error: null as string | unknown
}


const loginUserReducer = createSlice({
  name: "loginUser",
   initialState,
  reducers: {
    logoutAction:(state)=>{
      localStorage.removeItem("graphqlUser")
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default loginUserReducer.reducer;
export const {logoutAction} =loginUserReducer.actions
