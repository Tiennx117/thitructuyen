import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const profileChangePasswordService = {
    getpwdmessage(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getpwdmessage', body);
    },

    validatechangepassword(data) {
        const userDefault = getCurrentUserDefault();
        let body = { ...data, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/userprofile/validatechangepassword', body);
    },
}

export { profileChangePasswordService };