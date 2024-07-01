import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const blogService = {
    getbloglist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/blog/getbloglist', body);
    },
    getblogdetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/blog/getblogdetails', body);
    },
    insertupdatedeletecomments(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/blog/insertupdatedeletecomments', body);
    },
    getprevcommentslisting(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/blog/getprevcommentslisting', body);
    },
    addrebusereportcomment(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/learning/addrebusereportcomment', body);
    },
    
}
export { blogService };