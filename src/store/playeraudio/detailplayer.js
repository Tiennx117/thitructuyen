import { createSlice } from '@reduxjs/toolkit'

const Default = {
  data: null,
};
export const playerAudioItem = createSlice({
  name: 'playerAudioItem',
  initialState: Object.assign({}, Default),
  reducers: {
    setPlayerAudioItem: (state, action) => {
      state = { ...Default, ...action.payload };
      return state;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setPlayerAudioItem } = playerAudioItem.actions

export default playerAudioItem.reducer