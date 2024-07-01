import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const skillPathService = {

    getskilljobroles(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/getskilljobroles', body);
    },

    getskillpathchartdata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/getskillpathchartdata', body);
    },

    getskillssuggestedcourses(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/getskillssuggestedcourses', body);
    },

    updateselfanalysisrating(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/updateselfanalysisrating', body);
    },
}

export { skillPathService };