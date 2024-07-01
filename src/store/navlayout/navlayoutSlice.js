import { createSlice } from '@reduxjs/toolkit'

export const navlayoutSlice = createSlice({
  name: 'navlayout',
  initialState: {
    value:0,
    selectedMenu:'',
    onShowMenu: false
  },
  reducers: {
      setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload
      return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedMenu } = navlayoutSlice.actions

export default navlayoutSlice.reducer