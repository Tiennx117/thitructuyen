import { createSlice } from '@reduxjs/toolkit'

const Default = {
  data: null,
};

export const progressLtsAudioBook = createSlice({
  name: 'progressLtsAudioBook',
  initialState: Object.assign({}, Default),
  reducers: {
    setProgressLtsAudioBook: (state, action) => {      
      state = {...Default, ...action.payload};
      return state;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setProgressLtsAudioBook } = progressLtsAudioBook.actions

export default progressLtsAudioBook.reducer