import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const conversationService = {
    getconversationlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/conversation/getconversationlist', body);
    },
    getconversationtopics(params) {
        const userDefault = getCurrentUserDefault();
        let body = { ...params, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/conversation/getconversationtopics', body);
    },
    insertupdatedeletecomments(params) {
        const userDefault = getCurrentUserDefault();
        let body = { ...params, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/conversation/insertupdatedeletecomments', body);
    },
    addrebusereportcomment(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/learning/addrebusereportcomment', body);
    },
    getprevcommentslisting1(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/conversation/getprevcommentslisting', body);
    },
    getlatestcomment(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/conversation/getlatestcomment', body);
    },





    //#region Tab Cu?c tr� chuy?n
    getprevcommentslisting(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/conversation/getprevcommentslisting', body);
    },
    deletetopics(params) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, ...params };
        return axios.post(PATH_APILMS_V2 + '/conversation/deletetopics', body);
    },
    addtopic(params) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, ...params };
        return axios.post(PATH_APILMS_V2 + '/conversation/addtopic', body);
    },
    getfilecontroldetails(params) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, ...params };
        return axios.post('AppService/api/fileupload/getfilecontroldetails', body);
    },
    //https://e.eps.lms.com/AppService/api/fileupload/getfilecontroldetails

    //#endregion



}
export { conversationService };
