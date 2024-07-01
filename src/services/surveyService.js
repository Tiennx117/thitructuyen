import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const surveyService = {
    getsurveylist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/survey/getsurveylist', body);
    },
    getsurveydetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/survey/getsurveydetails', body);
    },
    getsurveypollresult(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/survey/getsurveypollresult', body);
    },
    savesurveyanswer(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/survey/savesurveyanswer', body);
    }

}
export { surveyService };