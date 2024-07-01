import { createSlice } from '@reduxjs/toolkit'

export const perFormExam = createSlice({
  name: 'exam',
  initialState: {
    dataResumeassessment:{},
    datamrqquestion:{},
    datafibquestion:{},
    datamcqquestion:{},
    datatfquestion:{},
    datamfquestion:{},
    dataosquestion:{},
    QuestionIdList:[],
    QuestionTypeList:[],
    SelectedQuestion:{},
    visibleDialog:false,
    timelocal:0,
    index30s:0,
    time5s:-999,
    dataLocalStorage:[],
    offautosb:false,
    showReview:false,
    hideExam:0,
    formNotificationAutoSB:false,
    paramsSubmit:{},
    textCountDown:'',
    visibleSubmitPassPoints:false,
    condition:false,
    countAutoSubmit:0,
    countAutoSubmit:0,
    formAutoSubmit:false,
    NodeIDRedux:0,
    loadApiOverView:false
}
  ,
  reducers: {
    updateResumeassessment: (state, action)=> {
        state.dataResumeassessment=action.payload
        return state;
    },
    // câu hỏi đúng sai 
    //type=1
    updatetfquestion: (state, action)=> {
        state.datatfquestion=action.payload
        return state;
    },
    //câu hỏi điền vào chỗ trống
    //type=2
    updatefibquestion: (state, action)=> {
        state.datafibquestion=action.payload
        return state;
    },
    //câu hỏi trắc nghiệm
    //type=3
    updatemcqquestion: (state, action)=> {
        state.datamcqquestion=action.payload
        return state;
    },
    //Nhiều câu trả lời
    //Type=4
    updatemrqquestion: (state, action)=> {
        state.datamrqquestion=action.payload
        return state;
    },
    //câu hỏi nối từ
    //Type=5
    updatemfquestion: (state, action)=> {
        state.datamfquestion=action.payload
        return state;
    },
    //câu hỏi nối từ
    //Type=5
    updateosquestion: (state, action)=> {
        state.dataosquestion=action.payload
        return state;
    },
    setQuestionIdList: (state, action)=> {
        state.QuestionIdList=action.payload
        return state;
    },
    setQuestionTypeList: (state, action)=> {
        state.QuestionTypeList=action.payload
        return state;
    },
    setvisibleDialog: (state, action)=> {
        state.visibleDialog=action.payload
        return state;

    },
    settimelocal: (state, action)=> {
        state.timelocal=action.payload
        return state;
    },
    setindex30s: (state, action)=> {
        state.index30s=action.payload
        return state;
    },
    setdataLocalStorage: (state, action)=> {
        state.dataLocalStorage=action.payload
        return state;
    },
    setoffautosb: (state, action)=> {
        state.offautosb=action.payload
        return state;
    },
    setErr: (state, action)=> {
        state.err=action.payload
        return state;
    },
    setHideExam: (state, action)=> {
        state.hideExam=action.payload
    },
    setShowReview: (state, action)=> {
        state.showReview=action.payload
        return state;
    },
    setFormNotificationAutoSB: (state, action)=> {
        state.formNotificationAutoSB=action.payload
        return state;
    },
    setparamsSubmit: (state, action)=> {
        state.paramsSubmit=action.payload
        return state;
    },
    setTextCountDown: (state, action)=> {
        state.textCountDown=action.payload
        return state;
    },
    setVisibleSubmitPassPoints: (state, action)=> {
        state.visibleSubmitPassPoints=action.payload
        return state;
    },
    setCondition: (state, action)=> {
        state.condition=action.payload
        return state;
    },
    setCountAutoSubmit: (state, action)=> {
        state.countAutoSubmit=action.payload
        return state;
    },
    setformAutoSubmit: (state, action)=> {
        state.formAutoSubmit=action.payload
        return state;
    },
    settime5s: (state, action)=> {
        state.time5s=action.payload
        return state;
    },
    setNodeIDRedux: (state, action)=> {
        state.NodeIDRedux=action.payload
        return state;
    },
    setLoadApiOverView: (state, action)=> {
        state.loadApiOverView=action.payload
        return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const {setLoadApiOverView,setNodeIDRedux,settime5s,setformAutoSubmit,setCountAutoSubmit,setCondition,setVisibleSubmitPassPoints,setTextCountDown,setFormNotificationAutoSB,setShowReview,setHideExam,setErr,setoffautosb,setvisibleDialog,setQuestionIdList,updateResumeassessment,updatemrqquestion,updatefibquestion,updatemcqquestion,updatetfquestion,updatemfquestion,updateosquestion, setdataLocalStorage,setindex30s,settimelocal,setparamsSubmit } = perFormExam.actions
//export const {setoffautosb,setdataLocalStorage,setindex30s,settimelocal,setvisibleDialog,setQuestionIdList,updateResumeassessment,updatemrqquestion,updatefibquestion,updatemcqquestion,updatetfquestion,updatemfquestion,updateosquestion } = perFormExam.actions

export default perFormExam.reducer