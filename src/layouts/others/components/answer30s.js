import { performExamService } from "services/performExamService";
const answer30s = async ( paramAnswer, markQuestion, count, data,selectedQuestion, showSentenceQuestion, type) => {
    //let arr = questionList
    if (paramAnswer.QuestionType == 1) {
        paramAnswer = { ...paramAnswer, ...{ "IsFinalized": "False", MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: data, } }
        let result = await performExamService.submittf(paramAnswer);
    }
    if (paramAnswer.QuestionType == 2) {
        if(data!="null"){
            paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: data, ResultantQuestion: selectedQuestion.ResultantQuestion } }
        }
        else{
            paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: "", ResultantQuestion: selectedQuestion.ResultantQuestion } }
        }
        let result = await performExamService.submitf(paramAnswer);
    }
    if (paramAnswer.QuestionType == 3) {
        if(data!==""&&data!==null&&data!=="null"){
            paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: data } }
        }
       else{
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count} }
       }
        let result = await performExamService.submitmcq(paramAnswer);
    }
    if (paramAnswer.QuestionType == 4) {
        let data1= data.toString()
        console.log('dataCheck',data)
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion,TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: data1, ResultantQuestion: selectedQuestion.ResultantQuestion } }
        let result = await performExamService.submitmrq(paramAnswer);
    }
    if (paramAnswer.QuestionType == 5) {
        let arrNM_ANSWR_ID = []
        let arrVC_CHC_TXT = []
        let arrVC_CRRCT_MTCH = []
        for (let i = 0; i < data.length; i++) {
            arrNM_ANSWR_ID.push(showSentenceQuestion.QuestionDetail?.Table[i].NM_ANSWR_ID)
            arrVC_CHC_TXT.push(showSentenceQuestion.QuestionDetail?.Table[i].VC_CHC_TXT)
            arrVC_CRRCT_MTCH.push(data[i].VC_CRRCT_MTCH)
        }
        let textNM_ANSWR_ID = arrNM_ANSWR_ID.join("~");
        let textVC_CHC_TXT = arrVC_CHC_TXT.join("~");
        let textVC_CRRCT_MTCH = arrVC_CRRCT_MTCH.join("~");
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count,AssessmentAttemptLeftTime: count, Response: "",Match: textVC_CRRCT_MTCH, AnswerId: textNM_ANSWR_ID, MatchChoice: textVC_CHC_TXT } }
        let result = await performExamService.submitmf(paramAnswer);
    }
    if (paramAnswer.QuestionType == 6) {
        paramAnswer = { ...paramAnswer, ...{ MarkQuestion: markQuestion, TimeAllowed: count,AssessmentAttemptLeftTime: count, Response: "", ObjectSequencing: data } }
        let result = await performExamService.submitos(paramAnswer);
    }
    if (paramAnswer.QuestionType == 7) {
        paramAnswer = { ...paramAnswer, ...{ "IsResumeAssessment": "False", MarkQuestion: markQuestion, TimeAllowed: count, AssessmentAttemptLeftTime: count, Response: data } }
        let result = await performExamService.submitd(paramAnswer);
    }
}
export { answer30s };
