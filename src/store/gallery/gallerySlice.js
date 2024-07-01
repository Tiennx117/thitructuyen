import { createSlice } from '@reduxjs/toolkit'

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    value: 0,
    selectedItems:[]
  },
  reducers: {
    selected: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let item = action.payload;
     
      const index = state.selectedItems.findIndex(x => x.id === item.id);
      if(index < 0){
        state.selectedItems.push(action.payload);
      }else{
        state.selectedItems.splice(index, 1);
      }
      
    },
    resetSelectedItems: (state)=>{
      state.selectedItems = [];
    },
    setSelectedItems:(state, action)=>{
      let items = action.payload;
      state.selectedItems = items;
    }
  },
})

// Action creators are generated for each case reducer function
export const { selected, resetSelectedItems, setSelectedItems } = gallerySlice.actions

export default gallerySlice.reducer