import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';


const cuocthiService = {
    getgamficationarealeaderboard(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/gamification/getgamficationarealeaderboard', body);
    },
    getgamificationlevels(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/gamification/getgamificationlevels', body);
    },
    
}
export { cuocthiService };