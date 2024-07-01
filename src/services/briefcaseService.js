import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const briefcaseService = {
  getsharedbriefcaselist(body) {
    const userDefault = getCurrentUserDefault();

    body = { ...userDefault, ...body };
    return axios.post(PATH_APILMS_V2 + '/learning/getsharedbriefcaselist', body);
  },
  getPublicAnnouncements(body = { "OrderBy": "RECENT" }) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/systemalert/getpublicannouncements', body);
  },
  getbriefcasefavlist(body) {
    const userDefault = getCurrentUserDefault();

    body = { ...userDefault, ...body };
    return axios.post(PATH_APILMS_V2 + '/learning/getbriefcasefavlist', body);
  },
  getbriefcasedetailslist(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...userDefault, ...body };
    return axios.post(PATH_APILMS_V2 + '/learning/getbriefcasedetailslist', body);
  },
  markbriefcasefav(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...userDefault, ...body };
    return axios.post(PATH_APILMS_V2 + '/learning/markbriefcasefav', body);
  }
}
export { briefcaseService };
