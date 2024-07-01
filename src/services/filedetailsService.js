import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const filedetailsService = {
  savehomeworkitemdetails(body) {
    const userDefault = getCurrentUserDefault();
    console.log(userDefault)
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/fileupload/savehomeworkitemdetails', body);
  },
  getPublicAnnouncements(body = { "OrderBy": "RECENT" }) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/systemalert/getpublicannouncements', body);
  },
}
export { filedetailsService };