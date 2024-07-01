import { createSlice } from '@reduxjs/toolkit'

const Default = {
  page: 0,
  rows: 10
};

export const pageCurrent = createSlice({
  name: 'pageCurrent',
  initialState: Object.assign({}, Default),
  reducers: {
    setPageCurrent: (state, action) => {      
      state = {...Default, ...action.payload};
      return state;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setPageCurrent } = pageCurrent.actions

export default pageCurrent.reducer