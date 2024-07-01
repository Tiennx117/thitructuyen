import { createSlice } from '@reduxjs/toolkit'

const Default = {
  data: null,
};

export const statusProgress = createSlice({
  name: 'statusProgress',
  initialState: Object.assign({}, Default),
  reducers: {
    setStatusProgress: (state, action) => {      
      state = {...Default, ...action.payload};
      return state;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setStatusProgress } = statusProgress.actions

export default statusProgress.reducer