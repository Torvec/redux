// const createSlice = require("@reduxjs/toolkit").createSlice;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Automatically generates pending, fulfilled, and rejected action types which is the entire lifecycle of an async request
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // Loading
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    // Success
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    // Failure
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
