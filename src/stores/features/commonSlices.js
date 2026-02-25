import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageName: "Home",
  icon: "Home",
  route: "home"
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
    setRoute: (state, action) => {
      state.route = action.payload
    }
  },
});

export const { setPageName, setIcon,setRoute } = commonSlice.actions;

export default commonSlice.reducer;