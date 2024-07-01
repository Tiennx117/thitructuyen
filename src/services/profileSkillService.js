import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const profileSkillService = {

    getskillandleveldata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/userprofile/getskillandleveldata', body);
    },

    getskills(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/getskills', body);
    },
}

export { profileSkillService };