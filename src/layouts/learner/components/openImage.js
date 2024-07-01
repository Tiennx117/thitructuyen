import axios from 'axios'
import { PATH_APILMS_V2, PARTIAL_VIEW } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

function CertificatePrint(obj) {
    console.log('hahaah')
    // return axios.post(PARTIAL_VIEW + 'Action=forward/VwCrtfcts_Srch_Lrn', obj, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data', // Đặt đúng header
    //   },
    // });


    // const userDefault = getCurrentUserDefault();
    // obj = { ...obj, ...userDefault };
    // return axios.post(PATH_APILMS_V2 + '/learning/GetImageCertificate', obj);
  }