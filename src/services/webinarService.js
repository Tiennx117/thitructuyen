import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const webinarService = {
    getwebinarsummary(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/webinar/getwebinarsummary', body);
    },
    getwebinarlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/webinar/getwebinarlist', body);
    },
}

export { webinarService };