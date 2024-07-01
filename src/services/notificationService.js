import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const notificationService = {
    gettotalnotificationcount(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/systemalert/gettotalnotificationcount', body);
    },
    GetMenuDetails(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/Home/GetMenuDetails', body);
    },
    getnotificationlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/systemalert/getnotificationlist', body);
    },
    setReadNotification(id) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, NotificationIds: id, Status: 0 };
        return axios.post(PATH_APILMS_V2 + '/systemalert/setnotificationstatus', body);
    },
    deleteNotification(id) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, NotificationIds: id, Status: 1 };
        return axios.post(PATH_APILMS_V2 + '/systemalert/setnotificationstatus', body);
    },
    getPublicAnnouncements(body = { "OrderBy": "RECENT" }) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/systemalert/getpublicannouncements', body);
    },
    setReadAnnouncements(id) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, AnnoncementId: id };
        return axios.post(PATH_APILMS_V2 + '/systemalert/readpublicannouncements', body);
    },
    getallnotificationlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/systemalert/getallnotificationlist', body);
    },
    getpublicannouncements(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/systemalert/getpublicannouncementlist', body);
    },
    gettotalnotificationcount(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...body, ...userDefault };
        return axios.post(PATH_APILMS_V2 + '/systemalert/gettotalnotificationcount', body);
    },
    getbanner(params) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, ...params };
        return axios.post(PATH_APILMS_V2 + '/banner/getbanner', body);
    },
    getfeaturedcoursedetail(params) {
        const userDefault = getCurrentUserDefault();
        let body = { ...userDefault, ...params };
        return axios.post(PATH_APILMS_V2 + '/learning/getfeaturedcoursedetail', body);
    },
}
export { notificationService };
