import { createSlice } from '@reduxjs/toolkit'

const Default = {
  data: null,
};
export const detailUrlAudio = createSlice({
  name: 'detailUrlAudio',
  initialState: Default,
  reducers: {
    setDetailUrlAudio: (state, action) => {      
      state = {...Default, ...action.payload};
      return state;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setDetailUrlAudio } = detailUrlAudio.actions

export default detailUrlAudio.reducer