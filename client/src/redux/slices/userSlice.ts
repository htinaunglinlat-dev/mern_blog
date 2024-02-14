import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: {},
   loading: false,
   error: "",
}

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      fetch_start(state) {
         state.error = "";
         state.loading = true;
      },
      fetch_success(state, action) {
         state.loading = false;
         state.user = action.payload;
      },
      fetch_fail(state, action) {
         state.loading = false;
         state.error = action.payload;
      }
   }
})




export default userSlice.reducer;
export const  { fetch_start, fetch_success, fetch_fail } = userSlice.actions;