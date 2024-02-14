import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   count: 0,
}

const countSlice = createSlice({
   name: "count",
   initialState,
   reducers: {
      increment: (state) => {
         state.count += 1
      },
      decrement (state) {
         state.count = state.count === 0 ? 0 : state.count - 1
      }
   }
})

export default countSlice.reducer;

// the below code fragment can be found in:
export const { increment, decrement } = countSlice.actions;