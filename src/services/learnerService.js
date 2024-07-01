import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const learnerService = {
    getmylearnings(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/getmylearnings', body);
    },
    GetMyLearningNew(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/GetMyLearningNew', body);
    },
    getmylearningsummary(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/getmylearningsummary', body);
    },
    getpendingforapprovallearnings(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/getpendingforapprovallearnings', body);
    },
    getPublicAnnouncements(body = { "OrderBy": "RECENT" }) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/systemalert/getpublicannouncements', body);
    },
    getviewallmylearnings(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/getviewallmylearnings', body);
    },
    GetKeySearchAllMyLearnings(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/GetKeySearchAllMyLearnings', body);
    },

}
export { learnerService };
