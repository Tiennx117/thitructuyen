import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translation.json';
import translationVI from '../locales/vi/translation.json';
import { appSetting } from 'shared/app-settings';
import axios from 'axios';
// the translations
const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        // cấu hình local
        //resources,
        react: {
            useSuspense: false // fix lỗi Suspense component thông qua router
        },
        //cấu hình backend multiple from backend api
        backend:{
            //loadPath: 'http://localhost:1600/locales/resources1?lng={{lng}}&ns={{ns}}',// appSetting.ADMIN_URL+ '/locales/resources?lng={{lng}}&ns={{ns}}',
            allowMultiLoading: false,
            request: (options, url, payload, callback) => {
                let lmsLang = {
                    CorporateId: 1,// được lấy từ api get thông tin user
                    Culture:'vi-VN'
                }
                let lng = 'vi'
                if(url=='/locales/en/translation.json'){
                    lng='en';
                    lmsLang.Culture = 'en-US'
                }
                // try {
                //     // test local
                //     // axios.post('http://localhost:1600/locales/resources1', {lng:lng, ns:'1'}).then(result=>{
                //     //     callback(null, {
                //     //         data: result.data,
                //     //         status: 200, 
                //     //       });
                //     // })
                //     axios.post(appSetting.ADMIN_URL + '/AppService/api/v2/logon/getstringresources', lmsLang).then(result=>{
                //         callback(null, {
                //             data: result.data,
                //             status: 200, 
                //           });
                //     })

                // } catch (e) {
                //   console.error(e);
                //   callback(null, {
                //     status: 500,
                //   });
                // }
            },

        },

        fallbackLng: 'vi',
        debug: false,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;

