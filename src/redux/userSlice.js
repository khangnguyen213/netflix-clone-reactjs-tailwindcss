import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: {},
  users: [],
  list: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = state.users.filter(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user.length > 0) {
        state.session = user[0];
      } else {
        alert("Email or password not correct");
      }
    },
    logout: (state) => {
      state.session = {};
      alert("Succesful logout");
    },
    register: (state, action) => {
      if (state.users.some((user) => user.email === action.payload.email)) {
        alert("Email already existed");
      } else {
        state.users.push(action.payload);
        state.session = action.payload;
      }
    },
    addList: (state, action) => {
      if (
        state.list.some(
          (movie) =>
            movie.email === action.payload.email &&
            movie.item.title === action.payload.item.title
        )
      ) {
        alert("This movie already saved");
      } else {
        state.list.push(action.payload);
      }
    },
    removeList: (state, action) => {
      state.list = state.list.filter(
        (movie) =>
          movie.email !== action.payload.email ||
          (movie.email === action.payload.email &&
            movie.item.title !== action.payload.item.title)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, register, addList, removeList } =
  userSlice.actions;

export default userSlice.reducer;
