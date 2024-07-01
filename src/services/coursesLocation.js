import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const coursesLocation = {
    GetCoursesLocationByMenu(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/Courses/GetCoursesLocationByMenu', body);
    },
    GetCoursesLocationDetail(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/Courses/GetCoursesLocationDetail', body);
    },
    GetAllCoursesLocationByMenu(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/Courses/GetAllCoursesLocationByMenu', body);
    },
    GetAllCoursesLocation(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/Courses/GetAllCoursesLocation', body);
    },
    getMenuCoursesLocationList(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/Courses/GetMenuCoursesLocationList', body);
    },
    getListCoursesLocation(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/Courses/GetListCoursesLocation', body);
    },
}

export { coursesLocation };
