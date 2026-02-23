import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageName: "Home",
  icon: "Home", // ✅ store string instead of JSX
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    setIcon: (state, action) => {
      state.icon = action.payload; // string like "Home"
    },
  },
});

export const { setPageName, setIcon } = commonSlice.actions;

export default commonSlice.reducer;