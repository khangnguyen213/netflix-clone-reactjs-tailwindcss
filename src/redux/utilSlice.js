import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayDetail: false,
  item: {},
};

export const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    toggleDetail: (state) => {
      state.displayDetail = !state.displayDetail;
    },
    provideDetail: (state, action) => {
      state.item = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDetail, provideDetail } = utilSlice.actions;

export default utilSlice.reducer;
