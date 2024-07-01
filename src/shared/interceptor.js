/* eslint-disable */
import axios from "axios";
import { store } from "../store";
import { PATH_APILMS_V2, PATH_APILOG_V2, appSetting } from "../shared/app-settings";
import { setToken, removeToken } from '../store/oauth/oauthSlice';
import { decodeHtmlEntites } from "./utils/decodeHtmlEntites";
import he from 'he';
import Cookies from "js-cookie";
let authTokenRequest = null;
function refreshToken(refreshToken) {
  let data =
    "grant_type=refresh_token&client_id=" +
    appSetting.CLIENT_ID +
    "&refresh_token=" +
    refreshToken;
  return axios.post("/connect/token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

function getNewAccessToken(refresh_token) {
  //const refreshToken = window.localStorage.getItem("refreshToken");
  //const refreshToken = oauth.refresh_token;

  if (!authTokenRequest) {
    authTokenRequest = refreshToken(refresh_token);
    authTokenRequest.then(resetGetAccessTokenRequest, resetGetAccessTokenRequest);
  }

  return authTokenRequest;
}

function resetGetAccessTokenRequest() {
  authTokenRequest = null;
}

function loggerAPI(response) {
  try {
    if (appSetting.ADDRESS_LOGGER) {

      let checkLog = appSetting.LIST_API_LOG.filter(x => x === response.config.url);
      //console.log('checkLog.length',checkLog)
      if (checkLog.length > 0) {

        // const instance = axios.create({
        //   baseURL: appSetting.ADDRESS_LOGGER,
        //   headers: {'Content-Type': 'application/json'}
        // });

        let oauth = store.getState().oauth;
        let bodyjson = response.config.data;
        if (typeof response.config.data === 'object' && response.config.data !== null) {
          bodyjson = JSON.stringify(response.config.data)
        }

        let body = {
          user_name: oauth.LogOnCode,
          body: bodyjson,//response.config.data,
          domain: response.config.baseURL,
          path: response.config.url,
          status: response.status,
          data: JSON.stringify(response.data)
        };


        //console.log('beforeRequest', body)
        axios.post(PATH_APILOG_V2 + '/Learning/createlog', body);
      }
    }
  } catch {

  }

}
function loggerAPIERROR(response) {
  try {
    if (appSetting.ADDRESS_LOGGER) {

      let checkLog = appSetting.LIST_API_LOG_ERROR.filter(x => x === response.config.url);
      //console.log('checkLog.length',checkLog)
      if (checkLog.length > 0) {

        // const instance = axios.create({
        //   baseURL: appSetting.ADDRESS_LOGGER,
        //   headers: {'Content-Type': 'application/json'}
        // });

        let oauth = store.getState().oauth;
        let bodyjson = response.config.data;
        if (typeof response.config.data === 'object' && response.config.data !== null) {
          bodyjson = JSON.stringify(response.config.data)
        }

        let body = {
          user_name: oauth.LogOnCode,
          body: bodyjson,//response.config.data,
          domain: response.config.baseURL,
          path: response.config.url,
          status: response.status,
          data: JSON.stringify(response.data),
          note: 'LIST_API_LOG_ERROR'
        };


        //console.log('beforeRequest', body)
        axios.post(PATH_APILOG_V2 + '/Learning/createlog', body);
      }
    }
  } catch {

  }
}
export default function registerAxiosInterceptor() {
  axios.defaults.baseURL = appSetting.ADMIN_URL;
  axios.interceptors.request.use(
    function (config) {
      //console.log('config',config)
      let oauth = store.getState().oauth;
      if (oauth !== null) {
        let token = oauth.token;
        //set token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      let beforeRequest = {
        config: config,
        status: 0,
        data: null
      }
      //ẩn log before request
      //loggerAPI(beforeRequest)

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      // auto decode html entites
      if (response.status === 200) {

        //fix hay bị lỗi tiêu đề câu hỏi với api getmylearnings
        if (response.config.url === '/AppService/api/v2/learning/getmylearnings') {
          response.data.LearningOngoingItems?.forEach(item => {
            item.CourseName = he.decode(item.CourseName)
          })
          response.data.LearningCompletedItems?.forEach(item => {
            item.CourseName = he.decode(item.CourseName)
          })
          response.data.LearningNotStartedItems?.forEach(item => {
            item.CourseName = he.decode(item.CourseName)
          })
        }

        if (response.config.url === '/AppService/api/v2/learning/getmylearningdetail') {
          if (response.data) {
            response.data.LearningItem.CourseName = he.decode(response.data.LearningItem.CourseName);
          }

        }
        if (response.config.url === '/AppService/api/v2/assessment/openassessment') {
          if (response.data) {
            response.data.NodeName = he.decode(response.data.NodeName);
            response.data.ContentName = he.decode(response.data.ContentName);
            response.data.CourseName = he.decode(response.data.CourseName);


          }

        }

        //
        if (response.config.url === '/AppService/api/v2/learning/getpendingforapprovallearnings') {

          response.data.LearningItems?.forEach(item => {
            item.CourseName = he.decode(item.CourseName)
          })
        }



        // tạm thời fix dữ liệu đối với getusertimelinetiles
        if (response.config.url != '/AppService/api/v2/overview/getusertimelinetiles') {
          let data = decodeHtmlEntites(response.data);
          response.data = data;
        }
      }
      //console.log('response.config.url error',response)
      // lưu log đối với api khi làm bài thi
      loggerAPI(response);
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      console.log(error);
      //lưu log call api lỗi
      let res = error.response;
      loggerAPI(res);
      loggerAPIERROR(res);
      if (error.response.status === 401) {
        //debugger;
        console.log('da vao day', error.response.status)
        delete_cookie('ASP.NET_SessionId');
        delete_cookie('Auth_Cookie');
        sessionStorage.clear();
        store.dispatch(removeToken());
        window.location.href = appSetting.ADMIN_URL + '/DisplayLogout.aspx';
        //window.location = '/logout';
      }

      return Promise.reject(error);
    }
  );
}

function set_cookie(name, value) {
  document.cookie = name + '=' + value + '; Path=/;';
}
function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
