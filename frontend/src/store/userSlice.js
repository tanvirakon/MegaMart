import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user's information", //helpful but not necessary
  initialState, //oi onshotuk vitreo dea jto..but eta slick
  reducers: {
    setUserDetails: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
