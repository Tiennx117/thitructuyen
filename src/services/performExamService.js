import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const performExamService = {
  resumeassessment(body) {
    // const userDefault = getCurrentUserDefault();
    // console.log(userDefault)
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/resumeassessment', body);
  },
  finalizeassessment(body) {
    const userDefault = getCurrentUserDefault();
    body.StudentId = userDefault.UserId
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/finalizeassessment', body);
  },
  ReviewAssessmentReport(body) {
    const userDefault = getCurrentUserDefault();
    console.log(userDefault)
    body.StudentId = userDefault.UserId
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/Assessment/ReviewAssessmentReport', body);
  },
  OverviewAssessmentReport(body) {
    const userDefault = getCurrentUserDefault();
    body.StudentId = userDefault.UserId
    body = { ...body, ...userDefault };
  return axios.post(PATH_APILMS_V2 + '/Assessment/OverviewAssessmentReport', body);
},
  // câu hỏi đúng sai 
  //type=1
  gettfquestion(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/gettfquestion', body);
  },
  //câu hỏi điền vào chỗ trống
  //type=2
  getfibquestion(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getfibquestion', body);
  },
  //câu hỏi trắc nghiệp
  //type =3
  getmcqquestion(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getmcqquestion', body);
  },
  //nhiều câu trả lời
  //type=4
  getmrqquestion(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getmrqquestion', body);
  },
  // Câu hỏi nối từ 
  //type=5
  getmfquestion(body) {
    const userDefault = getCurrentUserDefault();
    body.StudentId = userDefault.UserId
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getmfquestion', body);
  },
  //câu hỏi sắp xếp
  //type=6
  getosquestion(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getosquestion', body);
  },
  submitmcq(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submitmcq', body);
  },
  submitf(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submitf', body);
  },
  openassessment(body) {
    const userDefault = getCurrentUserDefault();
    console.log('userDefault', userDefault)
    body.StudentId = userDefault.UserId
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/openassessment', body);
  },
  resetassessment(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/resetassessment', body);
  },
  startassessment(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/startassessment', body);
  },
  submittf(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submittf', body);
  },
  submitmcq(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submitmcq', body);
  },
  submitmrq(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submitmrq', body);
  },
  submitos(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submitos', body);
  },
  submitmf(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submitmf', body);
  },
  getdquestion(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getdquestion', body);
  },
  submitd(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/submitd', body);
  },
  getassessmentreattemptmessage(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getassessmentreattemptmessage', body);
  },
  getassessmentfeedbackreport(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/getassessmentfeedbackreport', body);
  },
  setautosubmissionlefttime(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/assessment/setautosubmissionlefttime', body);
  },
}
export { performExamService };
