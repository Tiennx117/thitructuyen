import axios from 'axios'
import { PATH_APILMS_V2, PATH_APILMS_V } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const videoService = {
    getvideourlfrlplaydetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getvideourlfrlplaydetails', body);
    },
    getVideoList(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/GetVideoList', body);
    },
    getavailablechannellist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getavailablechannellist', body);
    },
    getvideosuploadbylearner(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getvideosuploadbylearner', body);
    },
    getfilecontroldetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V + '/fileupload/getfilecontroldetails', body);
    },
    addvideosbylearner(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/addvideosbylearner', body);
    },
    videolibrarymenulist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/videolibrarymenulist', body);
    },
    getchannelnamelist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getchannelnamelist', body);
    },
    videolibraryhistoryvideolist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/videolibraryhistoryvideolist', body);
    },
    getfavoritevideos(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getfavoritevideos', body);
    },
    getfavoritevideosall(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        body.UserID = userDefault.UserId
        return axios.post(PATH_APILMS_V2 + '/video/GetVideAllList', body);
    },
    getfavoritevideosNoiBat(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        body.UserID = userDefault.UserId
        // body.SortBy="";
        return axios.post(PATH_APILMS_V2 + '/video/GetVideOoutstandingList', body);
    },
    getavailablechannelitem(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getavailablechannelitem', body);
    },
    gettopchannels(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/gettopchannels', body);
    },
    getlabel(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getlabel', body);
    },
    videolibrarysubscribedvideolist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/videolibrarysubscribedvideolist', body);
    },
    subscribeunsubcribechannel(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/subscribeunsubcribechannel', body);
    },

    getvideoplaydetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };


        return axios.post(PATH_APILMS_V2 + '/video/getvideoplaydetails', body);
    },
    addremovefavouritevideos(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };


        return axios.post(PATH_APILMS_V2 + '/video/addremovefavouritevideos', body);
    },
    getvideosinfobylearner(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/video/getvideosinfobylearner', body);
    },
    editvideosbylearner(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/video/editvideosbylearner', body);
    },
    deletelearnervideo(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/video/deletelearnervideo', body);
    },
    getchannellist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };

        return axios.post(PATH_APILMS_V2 + '/video/getchannellist', body);
    },
    getvideoplay(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getvideoplay', body);
    },
    addvideoplay(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/addvideoplay', body);
    },
    updatevideoplay(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/updatevideoplay', body);
    },
    deletevideoplay(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/deletevideoplay', body);
    },
    getallvideoplay(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getallvideoplay', body);
    },
    deletevideoplaylist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/deletevideoplaylist', body);
    },
    addvideoplaylist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/addvideoplaylist', body);
    },
    getvideoinplaylist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/video/getvideoinplaylist', body);
    }
    

}

export { videoService };
