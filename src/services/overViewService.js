import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const overViewService = {
    getoverviewuserprofile(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/overview/getoverviewuserprofile', body);
    },
    getoverviewupcomingtraining(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/overview/getoverviewupcomingtraining', body);
    },
    getoverviewmytask(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/overview/getoverviewmytask', body);
    },
    getusertimelinetiles(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/getusertimelinetiles', body);
    },
    sharetimelinetiles(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/sharetimelinetiles', body);
    },
    getsharetreejson(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/getsharetreejson', body);
    },
    getfilecontroldetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = {
            ...body,
            ...{ WebAppFlag: "W", AllowedFileTypes: "DOCUMENT|IMAGE|ZIP|VIDEO|AUDIO" }
        }
        return axios.post('AppService/api/fileupload/getfilecontroldetails', body);
    },
    getfileimgcontroldetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = {
            ...body,
            ...{ WebAppFlag: "W", AllowedFileTypes: "IMAGE" }
        }
        return axios.post('AppService/api/fileupload/getfilecontroldetails', body);
    },
    getuserlist(body) {

        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/getuserlist', body);
    },
    removetimelinetile(body) {

        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/removetimelinetile', body);
    },
    settimelinereportedabusecomment(body) {
        debugger;
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/settimelinereportedabusecomment', body);
    },
    deletetimelinetile(body) {
        const userDefault = getCurrentUserDefault();
        body = { TileId: body }
        body = { ...body, ...userDefault };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/deletetimelinetile', body);
    },
    blockusertimelinetiles(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/overview/blockusertimelinetiles', body);
    },
    blockeduserlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/blockeduserlist', body);
    },
    unblockedselecteduser(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W" } }
        return axios.post(PATH_APILMS_V2 + '/overview/unblockedselecteduser', body);
    },
    insertupdatedeleteconversationcomments(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/overview/insertupdatedeleteconversationcomments', body);
    },
    getusertimelineconversationlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/overview/getusertimelineconversationlist', body);
    },
    likeupdateovertimeline(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/overview/likeupdateovertimeline', body);
    },
    blocksharetimelinetilesuser(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/overview/blocksharetimelinetilesuser', body);
    },
    likeupdateovertimelineconversation(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        body = { ...body, ...{ WebAppFlag: "W", UserID: body.UserId } }
        return axios.post(PATH_APILMS_V2 + '/overview/likeupdateovertimelineconversation', body);
    },


}
export { overViewService };
