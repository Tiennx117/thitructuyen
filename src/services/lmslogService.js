import axios from 'axios'
import { appSetting } from 'shared/app-settings';
import { PATH_APILOG_V2 } from 'shared/app-settings';
import { store } from 'store';

const lmslogService = {
    createLog(courseId,nodeId, questionId, courseTitle='', questionTitle='', answerText='') {
        if(appSetting.ADDRESS_LOGGER){
              // const instance = axios.create({
              //   baseURL: appSetting.ADDRESS_LOGGER,
              //   headers: {'Content-Type': 'application/json'}
              // });
              let oauth = store.getState().oauth;
              let examAnswer = {
                course_id: courseId,
                node_id: nodeId,
                question_id: questionId, 
                course_title: courseTitle, 
                question_title: questionTitle, 
                answer_text: answerText
              }
              let body = {
                // lưu thêm thông tin vào các trường
                course_id: courseId,
                node_id: nodeId,
                question_id: questionId, 
                course_title: courseTitle, 
                question_title: questionTitle, 

                user_name: oauth.LogOnCode, 
                body:  JSON.stringify(examAnswer),
                domain: appSetting.ADMIN_URL,
                path: '',
                status: 1,
                note: 'Người dùng nhập trả lời câu tự luận',
                //path:'/AppService/api/v2/assessment/submitd'
              };
              //console.log('beforeRequest', body)
              axios.post(PATH_APILOG_V2 + '/Learning/createlog', body);
        }
        
    },
    filterLog(body){
      let paramsSearch = {
        courseId: body.courseId,
        courseCode: body.courseCode,
        courseTitle: body.courseTitle,
        userName: body.userName,
        path: body.path,
        domain: body.domain,
        status: body.status,
        fromDate: body.fromDate,
        toDate: body.toDate,
        pageNumber: body.pageNumber +1,
        pageSize: body.pageSize,
      }
      return axios.get(PATH_APILOG_V2 + '/Learning/filterLog',{ params: paramsSearch });
    }
    
}
export { lmslogService };