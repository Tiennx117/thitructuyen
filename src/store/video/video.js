import { createSlice } from '@reduxjs/toolkit'

export const video = createSlice({
  name: 'video',
  initialState: {
    calloneDetail:false
}
  ,
  reducers: {
    setcalloneDetail: (state, action)=> {
        state.calloneDetail=action.payload
        return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const {setcalloneDetail } = video.actions
//export const {setoffautosb,setdataLocalStorage,setindex30s,settimelocal,setvisibleDialog,setQuestionIdList,updateResumeassessment,updatemrqquestion,updatefibquestion,updatemcqquestion,updatetfquestion,updatemfquestion,updateosquestion } = perFormExam.actions

export default video.reducer