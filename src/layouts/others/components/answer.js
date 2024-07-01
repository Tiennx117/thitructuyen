import { performExamService } from "services/performExamService";
const answer = async ( paramAnswer, markQuestion, count, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor, type) => {
    console.log('dataRadioN',dataRadioN)
    //let arr = questionList
    if (paramAnswer.QuestionType == 1) {
        paramAnswer = { ...paramAnswer, ...{ "IsFinalized": "False",MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: dataRadioTF } }
        let result
        try {
            result = await performExamService.submittf(paramAnswer);
            if (type == 'submit') {
                let result2 =  await performExamService.getassessmentfeedbackreport(paramAnswer);
                let result1 = await performExamService.getassessmentreattemptmessage(paramAnswer);
                return {result1,result2}
            }
        } catch (result) {
            return {error:true,result:result.response.data.Message}
        }
    }
    if (paramAnswer.QuestionType == 2) {
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion,TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: dataInput, ResultantQuestion: selectedQuestion.ResultantQuestion } }
        let result 
        try {
            result = await performExamService.submitf(paramAnswer);
            if (type == 'submit') {
                let result2 =  await performExamService.getassessmentfeedbackreport(paramAnswer);
                let result1 = await performExamService.getassessmentreattemptmessage(paramAnswer);
                return {result1,result2}
            }
        } catch (result) {
            return {error:true,result:result.response.data.Message}
        }
    }
    if (paramAnswer.QuestionType == 3) {
        if(dataRadioN==undefined || dataRadioN==""){
            paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion,TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: null } }
        }
        else{
            paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion,TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: dataRadioN } }
        }
        let result 
        try {
            result = await performExamService.submitmcq(paramAnswer);
            if (type == 'submit') {
                let result2 =  await performExamService.getassessmentfeedbackreport(paramAnswer);
                let result1 = await performExamService.getassessmentreattemptmessage(paramAnswer);
                return {result1,result2}
            }
        } catch (result) {
            return {error:true,result:result.response.data.Message}
        }
    }
    if (paramAnswer.QuestionType == 4) {
        
        console.log('dataCheck',dataCheck)
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion,TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: dataCheck, ResultantQuestion: selectedQuestion.ResultantQuestion } }
        
        let result 
        try {
            result = await performExamService.submitmrq(paramAnswer);
            if (type == 'submit') {
                let result2 =  await performExamService.getassessmentfeedbackreport(paramAnswer);
                let result1 = await performExamService.getassessmentreattemptmessage(paramAnswer);
                return {result1,result2}
            }
        } catch (result) {
            return {error:true,result:result.response.data.Message}
        }
    }
    if (paramAnswer.QuestionType == 5) {
        console.log('dataSentence',dataSentence)
        let arrNM_ANSWR_ID = []
        let arrVC_CHC_TXT = []
        let arrVC_CRRCT_MTCH = []
        for (let i = 0; i < dataSentence.length; i++) {
            arrNM_ANSWR_ID.push(showSentenceQuestion.QuestionDetail?.Table[i]?.NM_ANSWR_ID)
            arrVC_CHC_TXT.push(showSentenceQuestion.QuestionDetail?.Table[i]?.VC_CHC_TXT)
            arrVC_CRRCT_MTCH.push(dataSentence[i]?.VC_CRRCT_MTCH)
        }
        let textNM_ANSWR_ID = arrNM_ANSWR_ID.join("~");
        let textVC_CHC_TXT = arrVC_CHC_TXT.join("~");
        let textVC_CRRCT_MTCH = arrVC_CRRCT_MTCH.join("~");
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count,"IsSubmitD": false, AssessmentAttemptLeftTime: count, Response: "", Match: textVC_CRRCT_MTCH, AnswerId: textNM_ANSWR_ID, MatchChoice: textVC_CHC_TXT } }
        
        let result 
        try {
            result = await performExamService.submitmf(paramAnswer);
            if (type == 'submit') {
                let result2 =  await performExamService.getassessmentfeedbackreport(paramAnswer);
                let result1 = await performExamService.getassessmentreattemptmessage(paramAnswer);
                return {result1,result2}
            }
        } catch (result) {
            return {error:true,result:result.response.data.Message}
        }
    }
    if (paramAnswer.QuestionType == 6) {
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count,"IsSubmitD": false, AssessmentAttemptLeftTime: count, Response: "", ObjectSequencing: dataSort } }
        let result 
        try {
            result = await performExamService.submitos(paramAnswer);
            if (type == 'submit') {
                let result2 =  await performExamService.getassessmentfeedbackreport(paramAnswer);
                let result1 = await performExamService.getassessmentreattemptmessage(paramAnswer);
                return {result1,result2}
            }
        } catch (result) {
            return {error:true,result:result.response.data.Message}
        }
    }
    if (paramAnswer.QuestionType == 7) {
        paramAnswer = { ...paramAnswer, ...{ "IsResumeAssessment": "False", MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: dataCkeditor } }
        
        let result 
        try {
            result = await performExamService.submitd(paramAnswer);
            if (type == 'submit') {
                let result2 =  await performExamService.getassessmentfeedbackreport(paramAnswer);
                let result1 = await performExamService.getassessmentreattemptmessage(paramAnswer);
                return {result1,result2}
            }
        } catch (result) {
            return {error:true,result:result.response.data.Message}
        }
    }
}
export { answer };
