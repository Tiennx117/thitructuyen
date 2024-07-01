import { Sidebar } from 'primereact/sidebar';
import { OpenAssessmentContainer } from 'layouts/learner/components/OpenAssessmentContainer';
import { useEffect, useState, useRef } from 'react';
import { performExamService } from "services/performExamService";
import NotificationSubmitPassPoints from './notificationSubmitPassPoints';
import { useSelector, useDispatch } from 'react-redux';
import { answer } from '../answer';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { setLoadApiOverView, setShowReview, setCondition, setVisibleSubmitPassPoints, setvisibleDialog, setoffautosb } from 'store/perFormExam/perFormExam';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';

import { useExamQuestionLocal } from 'hooks/useExamQuestionLocal'
const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const NotificationSubmit = (props) => {
    const dispatch = useDispatch();
    const { NodeID, ContentId, openassessment, essay, course_id, CourseLaunch_Id, AttemptsLeft, questionIdList, questionTypeList, formSubmit, courseLaunchId, nodeId, studentId, paramAnswer, markQuestion, count, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor } = props
    const [visibleFullScreen, setVisibleFullScreen] = useState(false)
    const [condition, setcondition] = useState(false) //huynv mở
    const [visibleform, setvisibleform] = useState(false)
    const [useID] = useState(getCurrentUserDefault().UserId)
    const [visible, setvisible] = useState(false)
    const [renderExam, setrenderExam] = useState(false)
    const { deleteItemDataLocal, getIdItemDataLocal, getallItemDataLocal, updateItemDataLocal } = useExamQuestionLocal();
    const [loading, setLoading] = useState(false);
    let timerSend = useRef();

    useEffect(() => {
        if (props.visibleSubmit) {
            setvisible(props.visibleSubmit);
        }
    }, [props.visibleSubmit])
    const submit = async () => {
        setLoading(true);
        const paramAnswer1 = paramAnswer
        const cc2 = {
            ...paramAnswer1, ...{
                CurrentQuestionId: questionIdList[paramAnswer1.Index].toString(),
                QuestionId: questionIdList[paramAnswer1.Index].toString(),
                QuestionType: questionTypeList[paramAnswer1.Index].toString(),
                LastAttemptIndex: (paramAnswer1.Index + 1),
                Index: (paramAnswer1.Index + 1),
                CurrentIndex: (paramAnswer1.Index + 1),
                "Submit": true,
                "FinalizeAssessment": "False",
                Mode: "open",
            }
        }
        localStorage.removeItem('timelocal' + '_' + props.useID + '_' + props.NodeID);
        //deleteItemDataLocal(props.useID, props.NodeID)
        let result = await answer(cc2, markQuestion, count, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor, 'submit')
        console.log('result',result)
        if (result.result1.data.AssessmentReattemptMessageDetail.Table[0]?.NM_MN_PSSNG_MRKS <= result.result2.data.AssessmentFeedbackReportDetail.Table1[0]?.FL_AGGRGT_MRKS_OBTND) {
            const action = setCondition(true)
            dispatch(action);
        }

        // let arr = []
        // localStorage.removeItem('timelocal' + '_' + useID + '_' + props.courseId);
        // for (let i = 0; i <= (questionIdList.length - 1); i++) {
        //     let d = new Date();
        //     if (questionTypeList[i] == 7) {
        //         arr = [...arr, ...[{ id: 'index' + useID + "_" + i + "_" + props.courseId, data: localStorage.getItem('data5s_' + useID + "_" + i + "_" + props.courseId), time: d.getTime() }]]
        //     }
        //     localStorage.removeItem('data5s_' + useID + "_" + i + "_" + props.courseId);
        //     localStorage.removeItem('index5s_' + useID + "_" + i + "_" + props.courseId);
        //     if (questionTypeList[i] == 6) {
        //         localStorage.removeItem('data5s_sort_' + useID + "_" + i + "_" + props.courseId);
        //     }
        // }
        // //let arr =[{id:'aaaa_'+4567,index:123,data:'cau tu luan', time:12312312312312}]
        // if (!idb) {
        //     console.log("This browser doesn't support IndexedDB");
        //     return;
        // }
        // const request = idb.open("db-Ckeditor", 1);
        // request.onerror = function (event) {
        //     console.error("An error occurred with IndexedDB");
        //     console.error(event);
        // };
        // request.onupgradeneeded = function (event) {
        //     console.log(event);
        //     const db = request.result;

        //     if (!db.objectStoreNames.contains("userData")) {
        //         const objectStore = db.createObjectStore("userData", { keyPath: "id" });
        //         objectStore.createIndex("data", "data", {
        //             unique: false,
        //         });
        //         objectStore.createIndex("time", "time", {
        //             unique: false,
        //         });
        //     }
        // };
        // request.onsuccess = function () {
        //     console.log("Database opened successfully");
        //     const db = request.result;
        //     var tx = db.transaction("userData", "readwrite");
        //     var userData = tx.objectStore("userData");
        //     arr.forEach((item) => userData.add(item));
        //     return tx.complete;
        // };

        timerSend.current = setTimeout(() => {
            const action1 = setVisibleSubmitPassPoints(true)
            dispatch(action1);
            setvisible(false)
            setrenderExam(true)
            const action = setoffautosb(true)
            dispatch(action);
            const action3 = setShowReview(false)
            dispatch(action3);
            const action2 = setvisibleDialog(false)
            dispatch(action2);
            setLoading(false);
        }, 5000);
        console.log('da vao day')
        //clearTimeout(timerSend.current);

        //setvisibleform(true)


        //props.onchange(false)
    }
    // const renderFooter = (name) => {
    //     return (
    //         <div>
    //             <Button label="Có" icon="pi pi-check" onClick={() => submit()} autoFocus />
    //             <Button label="Thoát" onClick={() => closevisible()} icon="pi pi-times" className="p-button-text" />
    //         </div>
    //     );
    // }
    const closevisible = () => {
        setvisible(false)
        props.close(false)
    }
    useEffect(() => {
        return () => {
            //unmout component thì hủy timerSend

            if (timerSend.current) {

                clearTimeout(timerSend.current);
                console.log('clearTimeout(timerSend)')
            }

        }
    }, [])
    return (
        <>

            <Dialog focusOnShow={false} header="Bạn có chắc chắn gửi" visible={visible} style={{ width: '50vw' }} onHide={() => closevisible()} closable={false}>
                <LoadingPanel loading={loading}>
                    <div style={{ float: 'right' }}>
                        <Button label="Có" icon="pi pi-check" onClick={() => submit()} autoFocus />
                        <Button label="Thoát" onClick={() => closevisible()} icon="pi pi-times" className="p-button-text" />
                    </div>
                </LoadingPanel>
            </Dialog>


            <Sidebar className='sidebar-header-none' visible={visibleFullScreen} fullScreen onHide={() => setVisibleFullScreen(false)}>
                {
                    <OpenAssessmentContainer courseLaunchId={courseLaunchId} nodeId={nodeId} studentId={studentId} />
                }
            </Sidebar>
            {/* <NotificationSubmitPassPoints useID={props.useID} NodeID={props.NodeID} openassessment={openassessment} onchange={() => setvisibleform(false)} essay={essay} renderExam1={renderExam} course_id={course_id} CourseLaunch_Id={CourseLaunch_Id} AttemptsLeft={AttemptsLeft} condition={condition} visibleform={visibleform}></NotificationSubmitPassPoints> */}
            <NotificationSubmitPassPoints useID={props.useID} NodeID={NodeID} ContentId={ContentId} openassessment={openassessment} essay={essay} renderExam1={renderExam} course_id={course_id} CourseLaunch_Id={CourseLaunch_Id} AttemptsLeft={AttemptsLeft} ></NotificationSubmitPassPoints>
            {/* <NotificationSubmitPassPoints NodeID={NodeID} ContentId={ContentId} openassessment={openassessment} essay={essay} renderExam1={renderExam} course_id={course_id} CourseLaunch_Id={CourseLaunch_Id} AttemptsLeft={AttemptsLeft} condition={condition}></NotificationSubmitPassPoints> */}



        </>
    )
}
NotificationSubmit.propTypes = {
    onchange: PropTypes.func,
    close: PropTypes.func,
};
NotificationSubmit.defaultProps = {
    onchange: () => { },
    close: () => { }
}
export default NotificationSubmit;