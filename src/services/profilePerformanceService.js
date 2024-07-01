import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const profilePerformanceService = {

    getearnpointdata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getearnpointdata', body);
    },

    getachievementdata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getachievementdata', body);
    },
}

export { profilePerformanceService };