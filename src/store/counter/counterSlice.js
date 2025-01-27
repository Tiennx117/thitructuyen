import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value:0
  },
  reducers: {
    increment: (state) => {
      debugger
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
      return state;
    },
    decrement: (state) => {
      state.value -= 1
      return state;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
      return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer