import axios from 'axios';
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const lienheService = {
    getcustomercaredata(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/customercare/getcustomercaredata', body);
    },

    getpublicfaq(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/customercare/getpublicfaq', body);
    },
}

export { lienheService };