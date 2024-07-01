import { createSlice } from '@reduxjs/toolkit'

const Default = {
  data: null,
};
export const voicePlayer = createSlice({
  name: 'voicePlayer',
  initialState: Object.assign({}, Default),
  reducers: {
    setVoicePlayer: (state, action) => {      
      state = {...Default, ...action.payload};
      return state;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setVoicePlayer } = voicePlayer.actions

export default voicePlayer.reducer