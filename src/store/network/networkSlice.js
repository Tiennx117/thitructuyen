import { createSlice } from '@reduxjs/toolkit'

export const networkSlice = createSlice({
  name: 'network',
  initialState: {
    status: true,
    count: 0
  },
  reducers: {

    incrementNetworkCount:(state, action)=>{
      state.status = action.payload;
      if(state.count<3)
        state.count++;
      return state
    },
    resetNetworkCount:(state, action)=>{
      state.status = action.payload;
      state.count = 0;
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStatusNetwork, incrementNetworkCount, resetNetworkCount} = networkSlice.actions

export default networkSlice.reducer