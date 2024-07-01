import axios from 'axios'
import Course from 'layouts/learner/components/Course';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const traininghistoryService = {
    gettraininghistorysummary(body) {
        const userDefault = getCurrentUserDefault();
        userDefault.WebAppFlag = "W";
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/gettraininghistorysummary', body);
    },

    getmytraininghistory(search, statusBy) {
        const userDefault = getCurrentUserDefault();
        userDefault.WebAppFlag = "W";
        let body = { ...search, ...userDefault, "statusBy": statusBy };
        return axios.post(PATH_APILMS_V2 + '/learning/getmytraininghistory', body);
    },
}
export { traininghistoryService };
