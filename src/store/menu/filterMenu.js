import { createSlice } from '@reduxjs/toolkit'

const Default = {

};

export const filterMenu = createSlice({
  name: 'filterMenu',
  initialState: Object.assign({}, Default),
  reducers: {
    setFilterMenu: (state, action) => {      
      state = {...Default, ...action.payload};
      return state;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setFilterMenu } = filterMenu.actions

export default filterMenu.reducer