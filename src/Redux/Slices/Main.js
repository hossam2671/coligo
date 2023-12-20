import { createSlice } from "@reduxjs/toolkit";

const MainSlice = createSlice({
  name: "main",
  initialState: {
    announcment: 0,
    dues: 0,
    isLogged: false,
  },
  reducers: {
    annons(state, action) {
      state.announcment = action.payload;
    },
    dues(state, action) {
      state.dues = action.payload;
    },
    log(state, action) {
      state.isLogged = action.payload;
    },
  },
});

export const { annons, dues, log } = MainSlice.actions;
export default MainSlice.reducer;
