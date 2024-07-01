import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const checklistService = {
  //Bài kiểm tra nhanh
  canlearnerexecute(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/checklist/canlearnerexecute', body);
  },
  getchecklistdetail(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/checklist/getchecklistdetail', body);
  },



}
export { checklistService };
