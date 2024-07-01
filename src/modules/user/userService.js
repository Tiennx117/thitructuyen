import axios from 'axios'
import { appSetting, AUTHORIZATION_BASE, PATH_APILMS_V2 } from 'shared/app-settings';
//import { httpClient } from 'shared/http/httpClient'
let path = '/AdminNew'
axios.defaults.headers.common = {"Content-Type": "application/json"}
let config = {
    headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
    } 
}
const userService = {
    create(obj){
        return axios.post(path + '/createUser', obj);
    },  
    getById(id){
      return axios.get(path + '/getUserById?id='+ id);
    },
    update(id, obj){
        return axios.put(path + '/updateUser?id='+ id, obj);
    },
    delete(id){
        return axios.delete(path + '/deleteUser?id=' + id);
    },
    filterPage(advanceSearch){
        const items_per_page = advanceSearch.items_per_page
        const current_page = advanceSearch.current_page
        const sort_by = advanceSearch.sort_by
        const descending = advanceSearch.descending
        const key_search = advanceSearch.key_search
        let url = path+ '/getUserData?items_per_page=' + items_per_page
        url += '&current_page=' + current_page
        url += '&sort_by=' + sort_by
        url += '&key_search=' + key_search
        url += '&descending=' + descending
        return axios.get(url);
    },
    active(user_id){
        return axios.get(path+'/active?user_id='+ user_id);
    },
    deactive(user_id){
        return axios.get(path+'/deactive?user_id='+ user_id);
    },
    changepassword(obj){
        return axios.put(path+'/changepassword', obj);
    },
    getMyProfile(user_id){
        return axios.get(path + '/getmyprofile?user_id='+ user_id);
    },
    changeMyProfile(user){
        let formdata = new FormData();
        formdata.append('image', user.image);
        user.image = null;
        formdata.append('value', JSON.stringify(user));
        let header = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }
        return axios.put(path+'/changeMyProfile', formdata, header);
    },
    checkEmailForgetPassword(email){
        return axios.post(path + '/check_email_forget_password?email='+email)
    },
    authCodeChangepassword(auth_code_changepassword){
        return axios.get(path + '/auth_code_changepassword/?auth_code_changepassword='+ auth_code_changepassword)
    },
    recoverPassword(obj){
        return axios.post(path + '/recover_password', obj);
    },
    validateUserName(user_name, id){
        return axios.get(path + '/validateUsername?user_name='+ user_name + '&id='+id);
    },
    loginGoogle(auth_code, client_id){
        return axios.get(path + '/login-google?auth_code='+ auth_code + '&client_id='+client_id);
    },
    permission(){
        return axios.get(path + '/permission');
    }, 
    logoutAllDevices(){
        return axios.get(path + '/logout-all-devices');
    },
    getMenu(){
        return axios.get(path + '/getmenu');
    }


}
export { userService };
