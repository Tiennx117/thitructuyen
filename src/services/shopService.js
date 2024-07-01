import axios from 'axios'
import { PATH_APILMS_V2 } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const shopService = {
    getshopmenulist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/getshopmenulist', body);
    },
    getpointsofuser(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/getpointsofuser', body);
    },
    getcatalogueitemlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/getcatalogueitemlist', body);
    },
    getcheckoutitemdetail(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/getcheckoutitemdetail', body);
    },
    savecontinueshopping(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/savecontinueshopping', body);
    },
    savecheckoutshopping(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, CheckoutCatalogueItemList: body };
        return axios.post(PATH_APILMS_V2 + '/shop/savecheckoutshopping', body);
    },
    removeitemfromviewcart(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/removeitemfromviewcart', body);
    },
    addtocart(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/addtocart', body);
    },
    getcataloguefavroiteitemlist(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/getcataloguefavroiteitemlist', body);
    },
    getuserpurchasehistory(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/getuserpurchasehistory', body);
    },
    addremovefavouritecatalogueitem(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/addremovefavouritecatalogueitem', body);
    },
    updatequantity(body) {
        const userDefault = getCurrentUserDefault();
        body = { ...userDefault, ...body };
        return axios.post(PATH_APILMS_V2 + '/shop/updatequantity', body);
    }
}
export { shopService };