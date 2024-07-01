import { createSlice } from '@reduxjs/toolkit'

export const listChannelSlice = createSlice({
  name: 'listChannel',
  initialState: {
    videolibrary_my_listChannel: []
  },
  reducers: {
    setListChannel: (state, action) => {
      state.videolibrary_my_listChannel = action.payload
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { setListChannel } = listChannelSlice.actions

export default listChannelSlice.reducer