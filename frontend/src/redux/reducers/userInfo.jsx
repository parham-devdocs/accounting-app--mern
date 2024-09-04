import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
          state["user_info"] = action.payload;
      state["token"] = action.payload.token
      console.log(state)
    },
    login: (state, action) => {
      state["isLoggedin"] = true;
    },
    logout: (state, action) => {
      state["isLoggedin"] = false;
    },
  },
});

export const { addUserInfo,login,logout } = userSlice.actions;

export default userSlice.reducer;
