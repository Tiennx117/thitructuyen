import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const catalogueService = {
    getavailablelearnings(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/getavailablelearnings', body);
    },
    getpubliccourses(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/getpubliccourses', body);
    },

    getpubliccoursesbytopic(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/learning/GetPublicCoursesByTopicId', body);
    },

    getlearningtopics(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/getlearningtopics', body);
    },
    getglobaltags(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/learning/getglobaltags', body);
    },
}

export { catalogueService };
