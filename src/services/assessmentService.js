import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const assessmentService = {


  //#region Chi tiết bài thi
  openassessment(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/openassessment', body);
  },
  resetassessment(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/resetassessment', body);
  },
  startassessment(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/startassessment', body);
  },

  gettfquestion(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/gettfquestion', body);
  },
  getmcqquestion(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/getmcqquestion', body);
  },
  getfibquestion(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/getfibquestion', body);
  },

  setautosubmissionlefttime(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/setautosubmissionlefttime', body);
  },
  submittf(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/submittf', body);
  },
  getassessmentfeedbackreport(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/getassessmentfeedbackreport', body);
  },

  reviewassessment(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/reviewassessment', body);
  },
  getfeedback(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/getfeedback', body);
  },

  finalizeassessment(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/assessment/finalizeassessment', body);
  },

  //#endregion



}
export { assessmentService };
