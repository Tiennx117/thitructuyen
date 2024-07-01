import { createSlice } from '@reduxjs/toolkit'

export const detaillearningSlice = createSlice({
  name: 'detaillearning',
  initialState: {
    dataDetail: {}
  },
  reducers: {
    setDetaiLearn: (state, action) => {
      state.dataDetail = action.payload
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDetaiLearn } = detaillearningSlice.actions

export default detaillearningSlice.reducer