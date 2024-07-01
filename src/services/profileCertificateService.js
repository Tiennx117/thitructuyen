import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const profileCertificateService = {

    getiltcoursecountdata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getiltcoursecountdata', body);
    },

    getcertificatesummarydata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getcertificatesummarydata', body);
    },

    getcertificatedata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getcertificatedata', body);
    },
    getcertificateactivesummaryData(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getcertificateactivesummarydata', body);
    },
    getcertificateexsonactivesummarydata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getcertificateexsonactivesummarydata', body);
    },
    getcertificateexprilsummarydata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getcertificateexprilsummarydata', body);
    },

}

export { profileCertificateService };