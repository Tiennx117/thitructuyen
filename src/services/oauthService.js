import axios from 'axios'
import { appSetting, AUTHORIZATION_BASE } from 'shared/app-settings';
 
//axios.defaults.baseURL='http://localhost:1500';
const oauthService = {
    login(params){
        let data = "grant_type=password&client_id="+appSetting.CLIENT_ID+"&username=" + params.username + "&password=" + params.password;
        data = data + '&keep_login='+ params.keep_login;
        data = data + '&client_secret='+ appSetting.CLIENT_SECRET;
        return axios.post('/connect/token', data, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },  
    
    refreshToken(param_refresh_token){
        let data = "grant_type=refresh_token&client_id=" + appSetting.CLIENT_ID + "&refresh_token=" + param_refresh_token
        return axios.post('/auth/login', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
    },  
    
    loginLMS(data){
      const body = {
        jwtToken:'',userName:data.username,password:data.password,IPAddress:'000.00.0.0',deviceUUID:'',
        corporateID:sessionStorage.getItem('corporateID'),
        aspSessionId:sessionStorage.getItem('aspSessionId')
      };
      console.log('loginLMS', body);
      return axios.post(appSetting.ADMIN_URL + '/AppService/api/v2/logon/getuseraccountdetail', body, {
        headers: {
          'Content-Type': 'application/json', //x-www-form-urlencoded
          'Authorization': AUTHORIZATION_BASE
        }
      });
    },
    checkDevice(aspSessionId){
      return axios.get(appSetting.ADMIN_URL + '/AppService/api/v2/Logon/CheckDevice?aspSessionId='+aspSessionId);
    }

}
export { oauthService };
