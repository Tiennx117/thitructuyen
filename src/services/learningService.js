import axios from 'axios'
import { PATH_APILMS_V2, PARTIAL_VIEW, PATH_APICHATBOT, PATH_APISQLITE } from 'shared/app-settings';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const learningService = {
  getfeaturedcourselearning(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/getfeaturedcourselearning', body);
  },
  getfeaturedcoursedetail(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/getfeaturedcoursedetail', body);
  },
  //#region Tổng quan
  getmylearningdetail(courseID, isMyLearning) {
    const userDefault = getCurrentUserDefault();
    let body;
    if (isMyLearning == false) {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", CourseLaunchId: "", tab: "", IsMyLearning: false };
    } else {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", CourseLaunchId: "", tab: "" };
    }
    return axios.post(PATH_APILMS_V2 + '/learning/getmylearningdetail', body);
  },
  getmylearningdetailnew(courseID, isMyLearning) {
    const userDefault = getCurrentUserDefault();
    let body;
    if (isMyLearning == false) {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", CourseLaunchId: "", tab: "", IsMyLearning: false };
    } else {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", CourseLaunchId: "", tab: "" };
    }
    return axios.post(PATH_APILMS_V2 + '/learning/getmylearningdetailnew', body);
  },
  getmylearningnodedetail(courseID, isMyLearning, isNodeClick) {
    const userDefault = getCurrentUserDefault();
    var IsNodeClick = isNodeClick == true ? "true" : "false";
    let body;
    if (isMyLearning == false) {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", "CourseLaunchId": "", tab: "", "IsNodeClick": IsNodeClick, IsMyLearning: false };
    } else {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", "CourseLaunchId": "", tab: "", "IsNodeClick": IsNodeClick };
    }
    return axios.post(PATH_APILMS_V2 + '/learning/getmylearningnodedetail', body);
  },
  getmylearningnodedetailnew(courseID, isMyLearning, isNodeClick) {
    const userDefault = getCurrentUserDefault();
    var IsNodeClick = isNodeClick == true ? "true" : "false";
    let body;
    if (isMyLearning == false) {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", "CourseLaunchId": "", tab: "", "IsNodeClick": IsNodeClick, IsMyLearning: false };
    } else {
      body = { ...userDefault, "CourseID": courseID, "GamificationPoints": "0", "CourseLaunchId": "", tab: "", "IsNodeClick": IsNodeClick };
    }
    return axios.post(PATH_APILMS_V2 + '/learning/getmylearningnodedetailnew', body);
  },
  resetreattempstforcoursenode(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/resetreattempstforcoursenode', body);
  },

  getassignedclassroomtrainingdetail(courseID) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, "IltId": courseID };
    return axios.post(PATH_APILMS_V2 + '/learning/getassignedclassroomtrainingdetail', body);
  },

  accessLearning(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/accesslearning', body);
  },
  classroomtrainingnominate(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/classroomtrainingnominate', body);
  },

  gethomeworkitemdetails(paramsUpload) { //HomeWork
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...paramsUpload };
    return axios.post(PATH_APILMS_V2 + '/learning/gethomeworkitemdetails', body);
  },
  getfilecontroldetails(params) { //Get Allow FileUpload HomeWork AppService/api/fileupload/getfilecontroldetails
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post('AppService/api/fileupload/getfilecontroldetails', body);
  },
  savehomeworkitemdetails(params) { //Save HomeWork
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/savehomeworkitemdetails', body);
  },
  withdrawiltnomination(params) { //Sent Reason Không tham gia
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/withdrawiltnomination', body);
  },
  markpresentbyself(params) { //Confirm Điểm danh
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/markpresentbyself', body);
  },

  //#region Tài liệu học tập
  updatescormattempt(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/updatescormattempt', body);
  },
  openscorm(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/openscorm', body);
  },
  openscorm13(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/Learning/OpenScorm13', body);
  },
  trackcourse(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/trackcourse', body);
  },
  trackcoursetincan(params, isoString) {
    const userDefault = getCurrentUserDefault();
    let body = { 'Email': userDefault.EmailId, 'Id': params.ResourceGUID, 'ActivityID': params.ActivityID, ...params, 'StartAt': isoString };
    return axios.post(PATH_APISQLITE + '/TinCan/GetNodeData', body);
  },
  setProgressAsync(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/setprogress', body);
  },
  // trackcoursetincan(params, isoString) {
  //   const userDefault = getCurrentUserDefault();
  //   let body = { 'Email': userDefault.EmailId, 'Id': params.ResourceGUID, 'ActivityID': params.ActivityID, ...params, 'StartAt': isoString };
  //   return axios.post(PATH_APICHATBOT + '/api/TinCan/GetNodeData', body);
  // },
  updateNodeTinCan(params, infoTinCan) {
    //debugger
    const userDefault = getCurrentUserDefault();
    let body = {
      'CorporateID': userDefault.CorporateId,
      'CourseID': params.CourseID,
      'NodeID': params.NodeID,
      'UserID': userDefault.UserId,
      TinCanInfo: {
        ...infoTinCan
      }
    };
    return axios.post(PATH_APILMS_V2 + '/Learning/UpdateNodeTinCan', body);
  },

  //#endregion


  //#endregion

  //#region Đánh giá xếp hạng
  getratingcomments(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/getratingcomments', body);
  },
  addratingcomment(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/addratingcomment', body);
  },
  addrebusereportcomment(params) {
    const userDefault = getCurrentUserDefault();
    let body = { ...userDefault, ...params };
    return axios.post(PATH_APILMS_V2 + '/learning/addrebusereportcomment', body);
  },
  //#endregion



  //#region Thông báo
  getcoursespecificannouncementlist(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/systemalert/getcoursespecificannouncementlist', body);
  },
  //#endregion


  //#region calender
  getmylearningcalender(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/learning/getmylearningcalender', body);
  },
  getmylearningcalenderongoing(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/learning/getmylearningcalenderongoing', body);
  },
  //#endregion

  //#region Video
  getvedioid(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/learning/getvedioid', body);
  },
  getvideoplaydetails(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/video/getvideoplaydetails', body);
  },
  //#endregion

  //#region GetThongTinGiangVien
  getinstructorbylogincode(iltID, loginCode) {

    return axios.post(PATH_APILMS_V2 + '/learning/getinstructorbylogincode?iltID=' + iltID + '&loginCode=' + loginCode);
  },
  //#endregion

  //#region Phản hồi lớp học tập trung
  getfeedbackformapi(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/learning/getfeedbackformapi', body);
  },
  saveiltfeedbackapi(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/learning/saveiltfeedbackapi', body);
  },
  getfeedbackdetailsapi(body) {
    const userDefault = getCurrentUserDefault();
    body = { ...body, ...userDefault };
    return axios.post(PATH_APILMS_V2 + '/learning/getfeedbackdetailsapi', body);
  },
  getimgcertificate(obj) {
    return axios.post(PARTIAL_VIEW + 'Action=forward/VwCrtfcts_Srch_Lrn', obj, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đặt đúng header
      },
    });
    // const userDefault = getCurrentUserDefault();
    // obj = { ...obj, ...userDefault };
    // return axios.post(PATH_APILMS_V2 + '/learning/GetImageCertificate', obj);
  }
  //#endregion
}
export { learningService };
