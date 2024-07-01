import { createSlice } from '@reduxjs/toolkit'

const Default = {
  data: null,
};
export const detailPlayerAudio = createSlice({
  name: 'detailplayaudio',
  initialState: Object.assign({}, Default),
  reducers: {
    setDetailPlayerAudio: (state, action) => {      
      state = {...Default, ...action.payload};
      return state;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setDetailPlayerAudio } = detailPlayerAudio.actions

export default detailPlayerAudio.reducer