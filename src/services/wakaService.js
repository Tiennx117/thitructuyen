import axios from 'axios';
import { PATH_APILMS_V2, appSetting } from 'shared/app-settings';
let path = '/api/ward';


const getInstanceAxios = (token) => {
    const instance = axios.create({
        baseURL: appSetting.WAKA_API || "https://beta-api.waka.vn",
        headers: { 'sign': token }
    });
    return instance;
};
const getInstanceAxiosLocal = () => {
    const instance = axios.create({
        baseURL: PATH_APILMS_V2,
    });
    return instance;
};
const wakaService = {

    filterPage(advanceSearch, token) {


        const items_per_page = advanceSearch.items_per_page
        const current_page = advanceSearch.current_page
        const sort_by = advanceSearch.sort_by
        const descending = advanceSearch.descending
        const key_search = advanceSearch.key_search
        let url = path + '/filterPage?items_per_page=' + items_per_page
        url += '&current_page=' + current_page
        url += '&sort_by=' + sort_by
        url += '&key_search=' + key_search
        url += '&descending=' + descending
        return axios.get(url);
    },
    detailContent(token) {
        let httpClient = getInstanceAxios(token)
        let url = '/partner/detailContent'

        return httpClient.get(url);
    },
    // listChapterAudio(token) {
    //     let httpClient = getInstanceAxios(token)        
    //     let url = '/partner/listChapterAudio'
    //     return httpClient.get(url);
    // },


    listChapterAudio(params, token) {
        let httpClient = getInstanceAxios(token)
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct; //loại nội dung: 1: ebook, 52: audio
        const ci = params.ci; //id cần lấy nội dung
        const type = params.type; // = 0 full, 1 tóm tắt
        const pn = params.pn; // mặc định =1; trang thứ n: bắt đầu từ trang 1        
        const ps = params.ps; //số bản ghi trên trang
        const sort = params.sort;
        // console.log('params', params);
        let url = '/partner/listChapterAudio?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&ci=' + ci
        url += '&type=' + type
        url += '&pn=' + pn
        url += '&ps=' + ps
        url += '&sort=' + sort        
        return httpClient.get(url);
    },

    searchContent(token) {
        let httpClient = getInstanceAxios(token)
        let url = '/partner/searchContent'
        return httpClient.get(url);
    },
    getStreamingLink(params, token) {
        let httpClient = getInstanceAxios(token)
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;        
        const ci = params.ci;
        let url = '/partner/getStreamingLink?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat        
        url += '&ci=' + ci  
        return httpClient.get(url);
    },
    listContentEnterpriseCategory(params, token) {
        let httpClient = getInstanceAxios(token)

        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const pn = params.pn;
        const ps = params.ps;
        const ci = params.ci;

        let url = '/partner/listContentEnterpriseCategory?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&pn=' + pn
        url += '&ps=' + ps
        url += '&ci=' + ci
        return httpClient.get(url);
    },
    listEnterpriseCategoryLocal(params, token) {
        let httpClient = getInstanceAxiosLocal(token)

        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;

        let url = '/Waka/listEnterpriseCategory?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct

        return httpClient.get(url);
    },

    listEnterpriseCategory(params, token) {
        let httpClient = getInstanceAxios(token)

        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;

        let url = '/partner/listEnterpriseCategory?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct

        return httpClient.get(url);
    },

    listContentEnterpriseCategoryLocal(params, token) {
        let httpClient = getInstanceAxiosLocal(token)

        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const ps = params.ps;
        const pn = params.pn;
        const ci = params.ci;

        let url = '/Waka/listContentEnterpriseCategory?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&pn=' + pn
        url += '&ps=' + ps
        url += '&ci=' + ci

        return httpClient.get(url);
    },

    detailContentLocal(params, token) {
        let httpClient = getInstanceAxiosLocal(token)

        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const ci = params.ci;

        let url = '/Waka/DetailContent?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&ci=' + ci

        return httpClient.get(url);
    },
    tokenDetailContentWaka(params) {
        // let httpClient = getInstanceAxiosLocal('')
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const ci = params.ci;

        let url = '/Waka/TokenDetailContentWaka?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&ci=' + ci

        return axios.get(PATH_APILMS_V2 + url);
    },
    tokenDetailContentWakaMobile(params) {
        // let httpClient = getInstanceAxiosLocal('')
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const ci = params.ci;

        let url = '/Waka/TokenDetailContentWaka?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&ci=' + ci

        return axios.get(PATH_APILMS_V2 + url);
    },
    tokenContentEnterpriseCategory(params) {
        // let httpClient = getInstanceAxiosLocal('')
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const ps = params.ps;
        const pn = params.pn;
        const ci = params.ci;

        let url = '/Waka/TokenContentEnterpriseCategory?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&pn=' + pn
        url += '&ps=' + ps
        url += '&ci=' + ci

        return axios.get(PATH_APILMS_V2 + url);
    },
    tokenContentEnterpriseCategory(params) {
        // let httpClient = getInstanceAxiosLocal('')
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const ps = params.ps;
        const pn = params.pn;
        const ci = params.ci;

        let url = '/Waka/TokenContentEnterpriseCategory?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&pn=' + pn
        url += '&ps=' + ps
        url += '&ci=' + ci

        return axios.get(PATH_APILMS_V2 + url);
    },
    tokenChapterAudio(params) {
        // let httpClient = getInstanceAxiosLocal('')
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const ci = params.ci;
        const type = params.type || 0;
        const pn = params.pn || 1;
        const ps = params.ps || 10;
        const sort = params.sort || 0;

        let url = '/Waka/tokenChapterAudioWaka?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&ci=' + ci
        url += '&type=' + type
        url += '&pn=' + pn
        url += '&ps=' + ps
        url += '&sort=' + sort

        return axios.get(PATH_APILMS_V2 + url);
    },
    tokenSearchContentWaka(params) {
         const iss = params.iss;
         const did = params.did;
         const os = params.os;
         const iat = params.iat;
         const ct = params.ct;
         const ps = params.ps;
         const pn = params.pn;         
         const q = params.q;
 
         let url = '/Waka/tokenSearchContentWaka?iss=' + appSetting.WAKA_ISS
         url += '&did=' + did
         url += '&os=' + os
         url += '&iat=' + iat
         url += '&ct=' + ct
         url += '&pn=' + pn
         url += '&ps=' + ps         
         url += '&q=' + q
 
         return axios.get(PATH_APILMS_V2 + url);
    },

    searchListContent(params, token) {
        // let httpClient = getInstanceAxios(token)
        // let url = '/partner/searchContent'
        // return httpClient.get(url);
        let httpClient = getInstanceAxios(token)

        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;
        const ct = params.ct;
        const pn = params.pn;
        const ps = params.ps;
        const q = params.q;

        let url = '/partner/searchContent?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat
        url += '&ct=' + ct
        url += '&pn=' + pn
        url += '&ps=' + ps
        url += '&q=' + q        
        return httpClient.get(url);
    },

    tokenStreamingLinkWaka(params) {
        let httpClient = getInstanceAxiosLocal('');
        const iss = params.iss;
        const did = params.did;
        const os = params.os;
        const iat = params.iat;        
        const ci = params.ci;
        let url = '/Waka/tokenStreamingLinkWaka?iss=' + appSetting.WAKA_ISS
        url += '&did=' + did
        url += '&os=' + os
        url += '&iat=' + iat        
        url += '&ci=' + ci        
        return axios.get(PATH_APILMS_V2 + url);
    },
    
    insertEnterpriseCategory(lts){
        return axios.post(PATH_APILMS_V2 + '/AudioBuc/InsertCategory', lts);
    },
    
    insertAudioBook(obj){
        return axios.post(PATH_APILMS_V2 + '/AudioBuc/GetAudioBookDetails', obj);
    },

    playAudioBook(lts){
        return axios.post(PATH_APILMS_V2 + '/AudioBuc/PlayAudioBookDetails', lts);
    },
    
    logStatusAndCalculateTotalListeningTime(obj){
        return axios.post(PATH_APILMS_V2 + '/AudioBuc/LogStatusAndCalculateTotalListeningTime', obj);
    },

    getCurrentListeningTime(chapter_id, audio_book_id, user_id){
        return axios.get(PATH_APILMS_V2 + `/AudioBuc/GetCurrentListeningTime?chapter_id=${chapter_id}&audio_book_id=${audio_book_id}&user_id=${user_id}`);
    },

    getProgressLtsAudioBook(obj){
        return axios.post(PATH_APILMS_V2 + '/AudioBuc/GetProgressLtsAudioBook', obj);
    },

    getProgressAudioBook(audio_book_id, user_id){
        return axios.get(PATH_APILMS_V2 + `/AudioBuc/GetProgressAudioBook?audio_book_id=${audio_book_id}&user_id=${user_id}`);
    },

    getProgressLtsAudioBookChapter(audio_book_id, user_id){
        return axios.get(PATH_APILMS_V2 + `/AudioBuc/GetProgressLtsAudioBookChapter?audio_book_id=${audio_book_id}&user_id=${user_id}`);
    },

    getChapterLast(audio_book_id, user_id){
        return axios.get(PATH_APILMS_V2 + `/AudioBuc/GetChapterLastByUser?audio_book_id=${audio_book_id}&user_id=${user_id}`);
    }
}

export { wakaService };
