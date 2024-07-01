import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const FrameworkConfigService = {
    getall(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        console.log('body', body);
        return axios.post(PATH_APILMS_V2 + '/FrameworkConfiguration/GetAll', body);
    },

    getbyidnl(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        console.log('body', body);
        return axios.post(PATH_APILMS_V2 + '/FrameworkConfiguration/GetCourseByIDNL', body);
    },


}
export { FrameworkConfigService };