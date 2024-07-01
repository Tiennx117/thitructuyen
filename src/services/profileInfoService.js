import axios from 'axios'
import Course from 'layouts/learner/components/Course';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const profileInfoService = {

    getuserdetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getuserdetails', body);
    },

    getuserprofiledata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getuserprofiledata', body);
    },
    getuserprofilemobile(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getuserprofilemobile', body);
    },

    saveuserdetails(body) {
        //const userDefault = getCurrentUserDefault();
        //body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/saveuserdetails', body);
    },

    getuserpersonaldata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/userprofile/getuserpersonaldata', body);
    },

    updateprofileimage(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/userprofile/updateprofileimage', body);
    }
}

export { profileInfoService };