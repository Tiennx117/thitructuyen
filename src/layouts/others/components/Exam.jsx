import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState, useRef } from 'react';
import ChecksQuestion from "./QuestionForm/ChecksQuestion";
import RadioQuestion from "./QuestionForm/RadioQuestion";
import RadioTFQuestion from "./QuestionForm/RadioTFQuestion";
import InputQuestion from "./QuestionForm/InputQuestion";
import CkeditorQuestion from "./QuestionForm/CkeditorQuestion";
import SortQuestion from "./QuestionForm/SortQuestion";
import SentenceQuestion from "./QuestionForm/SentenceQuestion";
import { useParams } from 'react-router-dom';
import { performExamService } from "services/performExamService";
import { useSelector, useDispatch } from 'react-redux';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { useQuery, useUrlParam } from "shared/hooks/useQuery";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { Dialog } from 'primereact/dialog';
import NotificationSubmit from "./Submit/notificationSubmit";
import NotificationSubmitPassPoints from "./Submit/notificationSubmitPassPoints";
import Thongbaosubmit from "./Submit/thongbaosubmit";
import { BsFillCircleFill } from "react-icons/bs";
//import CountDown from "./countdown";
import { Clock } from "./countdown";
import { Tooltip } from 'primereact/tooltip';
import { upDateDataLocal } from "./upDateLocalTime";
//import { setFormNotificationAutoSB, setShowReview,setparamsSubmit, setHideExam, setErr, updateosquestion, updateResumeassessment, setvisibleDialog, updatemrqquestion, updatefibquestion, updatemcqquestion, updatemfquestion, updatetfquestion, setQuestionIdList } from 'store/perFormExam/perFormExam';
//import { setFormNotificationAutoSB, setShowReview, setparamsSubmit, setHideExam, setErr, updateosquestion, updateResumeassessment, setvisibleDialog, updatemrqquestion, updatefibquestion, updatemcqquestion, updatemfquestion, updatetfquestion, setQuestionIdList } from 'store/perFormExam/perFormExam';
//import { setVisibleSubmitPassPoints, setFormNotificationAutoSB, setShowReview, setparamsSubmit, setHideExam, setErr, updateosquestion, updateResumeassessment, setvisibleDialog, updatemrqquestion, updatefibquestion, updatemcqquestion, updatemfquestion, updatetfquestion, setQuestionIdList } from 'store/perFormExam/perFormExam';
import { setNodeIDRedux, settime5s, setoffautosb, setformAutoSubmit, setCountAutoSubmit, setCondition, setVisibleSubmitPassPoints, setFormNotificationAutoSB, setShowReview, setparamsSubmit, setHideExam, setErr, updateosquestion, updateResumeassessment, setvisibleDialog, updatemrqquestion, updatefibquestion, updatemcqquestion, updatemfquestion, updatetfquestion, setQuestionIdList } from 'store/perFormExam/perFormExam';
import './exam.scss';
import { answer } from "./answer";
import { RiCheckboxIndeterminateLine } from "react-icons/ri";
import Err from "./Submit/err";
import PropTypes from 'prop-types';
import { useNetworkStatus, NetworkDetector } from "react-network-status";
import { incrementNetworkCount, resetNetworkCount } from "store/network/networkSlice";
import { answer30s } from "./answer30s";
import { useExamDescriptive } from 'hooks/useExamDescriptive'
import { useExamQuestionLocal } from 'hooks/useExamQuestionLocal'
import ReviewExam from "./Review/review";
import DemoThucHienThi from "./Submit/DemoThucHienThi";
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
//import { useHotkeys } from 'react-hotkeys-hook'
import BlockComponent from "components/BlockComponent";
import { useHotkeys } from 'react-hotkeys-hook'
const Exam = (props) => {
    const [CourseCode] = useState(props.courseCode)
    //////console.log('ma', CourseCode)
    const { course_id, type, CourseLaunch_Id } = props
    const countRef = useRef();
    const dispatch = useDispatch();
    //let { course_id } = useParams();
    let query = useQuery();
    const [bodymrqquestion, setbodymrqquestion] = useState({
        "Mode": "open",
        "CurrentIndex": 0,
        CurrentQuestionId: null,
        QuestionType: null,
        QuestionId: null,
        LastAttemptIndex: 0,
        "MarkQuestion": "false",
    })
    const [showSentenceQuestion, setShowSentenceQuestion] = useState();
    //const [questionIdList, setquestionIdList] = useState([]);
    const textCountDown = useSelector(state => state.exam.textCountDown);
    const [loading, setLoading] = useState(false);
    const [useID] = useState(getCurrentUserDefault().UserId)
    const [answeredListID, setansweredListID] = useState([]);
    const [questionTypeList, setquestionTypeList] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [dataRadioTF, setdataRadioTF] = useState()
    const [dataRadioN, setdataRadioN] = useState(0)
    const [dataInput, setdataInput] = useState('')
    const [dataCheck, setdataCheck] = useState('')
    const [dataSort, setdataSort] = useState('')
    const [dataSentence, setdataSentence] = useState([])
    const [dataCkeditor, setdataCkeditor] = useState()
    const [oder, setoder] = useState(0);
    // offautosb biến để xác định khi submit thủ công thì dừng timer count down
    const offautosb = useSelector(state => state.exam.offautosb);

    const hideExam = useSelector(state => state.exam.hideExam);
    const [markQuestion, setmarkQuestion] = useState()
    const [bodyParams, setbodyParams] = useState({});
    const dataResumeas = useSelector(state => state.exam.dataResumeassessment);
    const questionIdList = useSelector(state => state.exam.QuestionIdList);
    const [count, setCount] = useState();
    const [timdeDF, settimdeDF] = useState()
    const [formSubmit, setformSubmit] = useState(0);
    //const [paramsSubmit, setparamsSubmit] = useState({})
    const paramsSubmit = useSelector(state => state.exam.paramsSubmit);
    const [directional, setdirectional] = useState('')
    const [AttemptsLeft, setAttemptsLeft] = useState(0)
    const time5s = useSelector(state => state.exam.time5s);
    //const [time5s, settime5s] = useState()
    // const [condition, setcondition] = useState(false)
    const [visible, setvisible] = useState(false)
    const [visibleSubmit, setvisibleSubmit] = useState(false)
    const visibleDialog1 = useSelector(state => state.exam.visibleDialog);
    const [essay, setessay] = useState(false)
    const [openassessment, setopenassessment] = useState({})
    const [questionTxtList, setquestionTxtList] = useState([])
    const [autosubmis, setautosubmis] = useState({})
    const [courseId, setcourseId] = useState()
    const [time30s, settime30s] = useState('')
    const [submissionlefttime, setsubmissionlefttime] = useState('')
    const { item, addOrUpdate, getItemById, deleteItemById, getAllItem } = useExamDescriptive();
    const showReview = useSelector(state => state.exam.showReview);
    const countAutoSubmit = useSelector(state => state.exam.countAutoSubmit);
    const [sortQuestionReview, setsortQuestionReview] = useState({});
    const [ContentId, setContentId] = useState(0)
    const [NodeID, setNodeID] = useState(0)
    const { createItemDataLocal, deleteItemDataLocal } = useExamQuestionLocal();
    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const userMiddleName = useSelector(state => state.oauth.UserMiddleName) || '';
    const userLastName = useSelector(state => state.oauth.UserLastName) || '';
    const EmailId = useSelector(state => state.oauth.EmailId) || '';
    const [strquestionIdList, setStrquestionIdList] = useState('')
    const [strquestionTypeList, setStrquestionTypeList] = useState('')
    const [blockedAssessment, setblockedAssessment] = useState('')
    // tên bài thi 
    const [titleExam, setTitleExam] = useState('')
    const [courseName, setCourseName] = useState('')
    const [contentName, setContentName] = useState('')
    //const [loadExam, setloadExam] = useState(false)
    //datnh: thêm check status network 
    const configNetworkStatus = {
        timeout: 30000,
        interval: 10000,
        url: appSetting.ADMIN_URL,
    };

    useEffect(() => {
        //let element = document.body
        document.body.classList.add('overflow-y-disable');
        //element.getElementsByClassName("p-dialog-content")[0].style?.overflow = "hidden";
        //document.getElementsByClassName('p-dialog-content')[0].style.overflow = "hidden";
    }, []);
    // useEffect(() => {
    //     document.getElementById('information')?.focus();
    // }, []);
    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);
    useEffect(() => {
        if (props.visibleExam) {
            const action = setvisibleDialog(true)
            dispatch(action);
            loadApi();
        }
    }, [props.visibleExam])
    const [finishStatus, setfinishStatus] = useState(false);

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        let hashItem = window.location.hash.split('-')
        hashItem.pop()
        let strHash = hashItem.join('-')
        //if (strHash != '#list-item') {
        if (!finishStatus) {
            if (window.confirm("Bạn có muốn quay lại không?")) {
                setfinishStatus(true)
                const action = setvisibleDialog(false)
                dispatch(action);
                props.history.push("/");
            } else {
                window.history.pushState(null, null, window.location.pathname);
                setfinishStatus(false)
            }
        }
        //}

    }
    useEffect(() => {
        if (visibleDialog1 == true) {
            window.history.pushState(null, null, window.location.pathname);
            window.addEventListener('popstate', onBackButtonEvent);
            return () => {
                window.removeEventListener('popstate', onBackButtonEvent);
            };
        }

    }, [visibleDialog1]);
    //datnh: check networkStatusUpdate off
    const onNetworkStatusChange = (networkStatusUpdate) => {
        //////console.log('networkStatusUpdate', networkStatusUpdate);
        if (props.visibleExam) {
            //nếu mất mạng thì tăng biến đếm lên
            if (networkStatusUpdate === false)
                dispatch(incrementNetworkCount(networkStatusUpdate));
            else dispatch(resetNetworkCount(networkStatusUpdate));



        }
    }

    const loadApi = async () => {
        try {
            setLoading(true)
            const paramsopenassessment = {
                "CourseLaunchId": CourseLaunch_Id,
                "NodeId": course_id,
                "StudentId": 0,
            }
            let openassessment = await performExamService.openassessment(paramsopenassessment);
            setTitleExam(openassessment.data.NodeName)
            setCourseName(openassessment.data.CourseName)
            setContentName(openassessment.data.ContentName)
            const value = openassessment.data
            setopenassessment(value);
            setblockedAssessment(value.BlockedAssessment)
            const actionCondition = setCondition(false)
            dispatch(actionCondition);
            value.Status = 'S'
            // HuyNV90 Không đẩy vể server các trường chứa dữ liệu là tên
            value.QuestionTxtList = "";
            value.ContentName = "";
            value.CourseName = "";
            value.NodeName = "";
            let data
            switch (type) {
                case 'START':
                    let resetassessment = await performExamService.resetassessment(value);
                    let startassessment
                    startassessment = await performExamService.startassessment(value);
                    ////console.log('data', startassessment)
                    data = startassessment?.data
                    setcourseId(data?.CourseId)
                    setContentId(data?.ContentId)
                    setNodeID(data?.NodeId)
                    dispatch(setNodeIDRedux(data?.NodeId))
                    localStorage.setItem('timelocal' + '_' + useID + '_' + data?.NodeId, parseInt(data?.AssessmentAllowedDuration))
                    setCount(parseInt(data?.AssessmentAllowedDuration))
                    // dispatch(settime5s(parseInt(data?.AssessmentAllowedDuration)));
                    settimdeDF(parseInt(data?.AssessmentAllowedDuration))
                    //createItemDataLocal(useID, data?.NodeId)
                    try {
                        let exam_id = useID + "_" + data?.NodeId
                        let dataAllLocal = await getAllItem()
                        for (let i = 0; i < dataAllLocal.length; i++) {
                            if (dataAllLocal[i].useID_nodeId == exam_id) {
                                await deleteItemById(dataAllLocal[i].id)
                            }
                        }
                    }
                    catch (e) { }
                    //if(startassessment.data?.)
                    setAttemptsLeft(value.AttemptsLeft)
                    setdirectional('directional' + data.LastAttemptIndex)
                    // let result = await performExamService.resumeassessment(value);
                    // let data=result.data
                    const action = updateResumeassessment(data)
                    dispatch(action);
                    const params = { ...bodymrqquestion, ...data }
                    params.Index = data.LastAttemptIndex
                    setStrquestionIdList(data.QuestionIdList)
                    setStrquestionTypeList(data.QuestionTypeList)
                    let arr1 = data.QuestionIdList.split(",").map(Number);
                    let arr2 = data.QuestionTypeList.split(",").map(Number);
                    let arr3 = data.QuestionTxtList.split("(-)").map(String);
                    // let vitri = arr3[0].indexOf(' <')
                    // //console.log('vị trí',vitri)
                    //console.log('arr3', arr3)
                    //setCount((data?.AllowCurrentAssessmentTime == null) ? parseInt(data?.AssessmentAllowedDuration) : parseInt(data?.AllowCurrentAssessmentTime))
                    const action1 = setQuestionIdList(arr1)
                    dispatch(action1);
                    //setansweredListID(arr1)

                    // click Bắt đầu thì cũng khởi tạo lại giá trị offautosb=false  để timer count down
                    dispatch(setoffautosb(false));

                    setquestionTypeList(arr2);
                    setquestionTxtList(arr3)
                    setoder(data.LastAttemptIndex);
                    setbodyParams(params);
                    await getCurrentQuestion(arr1, arr2, data.LastAttemptIndex, params);
                    break;
                case 'RESUMEASSESSMENT':
                    let index
                    let result = await performExamService.resumeassessment(value);
                    data = result.data
                    setcourseId(data?.CourseId)
                    setContentId(data?.ContentId)
                    setNodeID(data?.NodeId)
                    dispatch(setNodeIDRedux(data?.NodeId))
                    settimdeDF(parseInt(data?.AssessmentAllowedDuration))
                    let time5slocal = localStorage.getItem('timelocal' + '_' + useID + '_' + data?.NodeId)
                    if (time5slocal !== null) {
                        setCount(time5slocal)
                    }
                    else {
                        setCount(parseInt(data?.AllowCurrentAssessmentTime))
                    }
                    setAttemptsLeft(value.AttemptsLeft)

                    // let result = await performExamService.resumeassessment(value);
                    // let data=result.data
                    const actionR = updateResumeassessment(data)
                    dispatch(actionR);
                    const paramsR = { ...bodymrqquestion, ...data }
                    setStrquestionIdList(data.QuestionIdList)
                    setStrquestionTypeList(data.QuestionTypeList)
                    let arr1R = data.QuestionIdList.split(",").map(Number);
                    let arr2R = data.QuestionTypeList.split(",").map(Number);
                    let arr3R = data.QuestionTxtList.split("(-)").map(String);
                    // let vitri = arr3[0].indexOf(' <')
                    // //console.log('vị trí',vitri)
                    //console.log('arr3', arr3)
                    //setCount((data?.AllowCurrentAssessmentTime == null) ? parseInt(data?.AssessmentAllowedDuration) : parseInt(data?.AllowCurrentAssessmentTime))
                    const action1R = setQuestionIdList(arr1R)
                    dispatch(action1R);
                    //setansweredListID(arr1)
                    setquestionTypeList(arr2R);
                    setquestionTxtList(arr3R)
                    if (parseInt(data.LastAttemptIndex) > 0) {
                        setdirectional('directional' + (parseInt(data.LastAttemptIndex) - 1))
                        paramsR.Index = parseInt(data.LastAttemptIndex) - 1
                        setoder(parseInt(data.LastAttemptIndex) - 1);
                        index = parseInt(data.LastAttemptIndex) - 1
                    }
                    else {
                        setdirectional('directional' + (parseInt(data.LastAttemptIndex)))
                        paramsR.Index = parseInt(data.LastAttemptIndex)
                        setoder(parseInt(data.LastAttemptIndex));
                        index = parseInt(data.LastAttemptIndex)
                    }

                    // click Resume thì cũng khởi tạo lại giá trị offautosb=false để timer count down
                    dispatch(setoffautosb(false));
                    //window.location.href = '#list-item-' + data.LastAttemptIndex;
                    setbodyParams(paramsR);
                    await getCurrentQuestion(arr1R, arr2R, index, paramsR);

            }
            setLoading(false)
        } catch (error) {
            const action1 = setErr(true)
            dispatch(action1);
        }

    }
    const getCurrentQuestion = async (questionIdList, questionTypeList, index, body, typeBtn = '', indexdirectional) => {
        // HuyNV90 Không đẩy vể server các trường chứa dữ liệu là tên
        body.QuestionTxtList = "";
        body.ContentName = "";
        body.CourseName = "";
        body.NodeName = "";
        setLoading(true)
        let error = false
        if (typeBtn == 'next') {
            index++;
            let currentQ = {
                CurrentQuestionId: questionIdList[index - 1].toString(),
                QuestionId: questionIdList[index - 1].toString(),
                QuestionType: questionTypeList[index - 1].toString(),
                LastAttemptIndex: parseInt(index),
                Index: parseInt(index),
                CurrentIndex: parseInt(index),
                Mode: "open",
                "IsSubmitD": false,
            }
            const paramAnswer = { ...body, ...currentQ }
            //setparamsSubmit(paramAnswer)

            let temp = countRef.current.getTimeCountDown();
            let answered = await answer(paramAnswer, markQuestion, temp, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor)
            error = answered?.error
            if (error !== true) {
                const action4 = setparamsSubmit(paramAnswer)
                dispatch(action4);
                setdirectional('directional' + index)
                setoder(index);
                setCount(temp)
            }
            else {
                alert(answered?.result)
            }
            updateIndexDB()
        }
        if (typeBtn == 'prev') {
            index--;
            let currentQ = {
                CurrentQuestionId: questionIdList[index + 1].toString(),
                QuestionId: questionIdList[index + 1].toString(),
                QuestionType: questionTypeList[index + 1].toString(),
                LastAttemptIndex: parseInt(index),
                Index: parseInt(index),
                CurrentIndex: parseInt(index),
                Mode: "open",
                "IsSubmitD": false,
            }
            const paramAnswer = { ...body, ...currentQ }
            let temp = countRef.current.getTimeCountDown();
            //setparamsSubmit(paramAnswer)
            let answered = await answer(paramAnswer, markQuestion, temp, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor)
            error = answered?.error
            if (error !== true) {
                const action4 = setparamsSubmit(paramAnswer)
                dispatch(action4);
                setCount(temp)
                setdirectional('directional' + index)
                setoder(index);
            }
            else {
                alert(answered?.result)
            }
            updateIndexDB()
        }
        if (typeBtn == 'directional') {

            let currentQ = {
                CurrentQuestionId: questionIdList[oder].toString(),
                QuestionId: questionIdList[oder].toString(),
                QuestionType: questionTypeList[oder].toString(),
                LastAttemptIndex: parseInt(oder),
                Index: parseInt(oder),
                CurrentIndex: parseInt(oder),
                Mode: "open",
                "IsSubmitD": false,
            }
            const paramAnswer = { ...body, ...currentQ }
            let temp = countRef.current.getTimeCountDown();
            //setparamsSubmit(paramAnswer)
            let answered = await answer(paramAnswer, markQuestion, temp, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor)
            error = answered?.error
            if (error !== true) {
                const action4 = setparamsSubmit(paramAnswer)
                dispatch(action4);
                setdirectional('directional' + indexdirectional)
                setCount(temp)
                setoder(index)
            }
            else {
                alert(answered?.result)
            }
            updateIndexDB()
        }
        if (typeBtn == 'submit') {
            let currentQ = {
                CurrentQuestionId: questionIdList[oder].toString(),
                QuestionId: questionIdList[oder].toString(),
                QuestionType: questionTypeList[oder].toString(),
                LastAttemptIndex: parseInt(oder),
                Index: parseInt(oder),
                CurrentIndex: parseInt(oder),
                Mode: "open",
                "Submit": true,
                "IsSubmitD": false,
                "FinalizeAssessment": "False",
            }
            const paramAnswer = { ...body, ...currentQ }
            let result = await answer(paramAnswer, markQuestion, count, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor, typeBtn)
            error = result?.error
            if (error !== true) {
                if (result.data.AssessmentReattemptMessageDetail.Table[0]?.NM_MN_PSSNG_MRKS <= result.data.AssessmentReattemptMessageDetail.Table[0]?.FL_AGGRGT_MRKS_OBTND) {
                    //setcondition(true)
                    const action1 = setCondition(true)
                    dispatch(action1);
                }
                setvisible(true)
                setCount(-1)
                return false
            }
            else {
                alert(result?.result)
            }
            updateIndexDB()
            return false
        }

        setLoading(true)
        if (error !== true) {
            let currentQ = {
                CurrentQuestionId: questionIdList[index].toString(),
                QuestionId: questionIdList[index].toString(),
                QuestionType: questionTypeList[index].toString(),
                LastAttemptIndex: (index),
                Index: (index),
                CurrentIndex: (index),
            }
            body = { ...body, ...currentQ }
            
            //setparamsSubmit(body)
            const action4 = setparamsSubmit(body)
            dispatch(action4);
            let resultQuestion = {};
            let arransweredListID = [];
            if (currentQ.QuestionType == 1) {
                let result = await performExamService.gettfquestion(body);
                resultQuestion = result.data;
                arransweredListID = resultQuestion?.QuestionStatusList.split(",").map(String);
            }
            if (currentQ.QuestionType == 2) {
                let result = await performExamService.getfibquestion(body);
                resultQuestion = result.data;
                arransweredListID = resultQuestion?.QuestionStatusList.split(",").map(String);
            }
            if (currentQ.QuestionType == 3) {
                let result = await performExamService.getmcqquestion(body);
                resultQuestion = result.data;
                arransweredListID = resultQuestion?.QuestionStatusList.split(",").map(String);
            }
            if (currentQ.QuestionType == 4) {
                let result = await performExamService.getmrqquestion(body);
                resultQuestion = result.data;
                arransweredListID = resultQuestion?.QuestionStatusList.split(",").map(String);
            }
            if (currentQ.QuestionType == 5) {
                let arrNM_ANSWR_ID = []
                let arrVC_CHC_TXT = []
                let arrVC_CRRCT_MTCH = []
                for (let i = 0; i < dataSentence.length; i++) {
                    arrNM_ANSWR_ID.push(dataSentence[i].NM_ANSWR_ID)
                    arrVC_CHC_TXT.push(showSentenceQuestion.QuestionDetail?.Table[i].VC_CHC_TXT)
                    arrVC_CRRCT_MTCH.push(dataSentence[i].VC_CRRCT_MTCH)
                }
                let textNM_ANSWR_ID = arrNM_ANSWR_ID.join("~");
                let textVC_CHC_TXT = arrVC_CHC_TXT.join("~");
                let textVC_CRRCT_MTCH = arrVC_CRRCT_MTCH.join("~");
                body = { ...body, ...{ Response: "", Match: textVC_CRRCT_MTCH, AnswerId: textNM_ANSWR_ID, MatchChoice: textVC_CHC_TXT } }
                let result = await performExamService.getmfquestion(body);
                setShowSentenceQuestion(result.data)
                resultQuestion = result.data;
                arransweredListID = resultQuestion?.QuestionStatusList.split(",").map(String);
            }
            if (currentQ.QuestionType == 6) {
                let result = await performExamService.getosquestion(body);
                resultQuestion = result.data;
                setsortQuestionReview(result.data)
                arransweredListID = resultQuestion?.QuestionStatusList.split(",").map(String);
            }
            if (currentQ.QuestionType == 7) {
                let result = await performExamService.getdquestion(body);
                resultQuestion = result.data;
                setessay(true)
                arransweredListID = resultQuestion?.QuestionStatusList.split(",").map(String);
            }
            setansweredListID(arransweredListID)
            resultQuestion.QuestionType = questionTypeList[index].toString();
            setmarkQuestion(resultQuestion?.FlaggedQuestion)
            //console.log('resultQuestion', resultQuestion)
            setSelectedQuestion(resultQuestion);
        }
        setLoading(false)

    }

    const renderCurrentQuestion = (CurrentQuestion, index) => {
        return (<>
            {/* {CurrentQuestion.QuestionType === "1" && <RadioTFQuestion courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataRadioTF(data)}  count={count} oder={parseInt(oder) + 1} datatfquestion={CurrentQuestion}></RadioTFQuestion>}
            {CurrentQuestion.QuestionType === "2" && <InputQuestion courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataInput(data)} count={count}  oder={parseInt(oder) + 1} datafibquestion={CurrentQuestion}></InputQuestion>}
            {CurrentQuestion.QuestionType === "3" && <RadioQuestion courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataRadioN(data)} count={count}  oder={parseInt(oder) + 1} datamcqquestion={CurrentQuestion}></RadioQuestion>}
            {CurrentQuestion.QuestionType === "4" && <ChecksQuestion courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataCheck(data.toString())}  count={count} oder={parseInt(oder) + 1} datamrqquestion={CurrentQuestion}></ChecksQuestion>}
            {CurrentQuestion.QuestionType === "5" && <SentenceQuestion courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataSentence(data)}  count={count} oder={parseInt(oder) + 1} dataSentence={CurrentQuestion} title={CurrentQuestion.Question} anwesersleft={CurrentQuestion.QuestionDetail?.Table} anwesers1={CurrentQuestion.QuestionDetail?.Table1} anwesers={CurrentQuestion.QuestionDetail?.Table}></SentenceQuestion>}
            {CurrentQuestion.QuestionType === "6" && <SortQuestion courseId={courseId} useID={useID} time5s={time5s} onchange={data => setdataSort(data)}  count={count} oder={parseInt(oder) + 1} dataSort={CurrentQuestion} title={CurrentQuestion.Question} anwesers1={CurrentQuestion.QuestionDetail?.Table1} anwesers={CurrentQuestion.QuestionDetail?.Table}></SortQuestion>}
            {CurrentQuestion.QuestionType === "7" && <CkeditorQuestion CourseCode={CourseCode} courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataCkeditor(data)}  count={count} oder={parseInt(oder) + 1} datadquestion={CurrentQuestion}></CkeditorQuestion>} */}
            {CurrentQuestion.QuestionType === "1" && <RadioTFQuestion nodeId={NodeID} courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataRadioTF(data)} count={count} oder={parseInt(oder) + 1} datatfquestion={CurrentQuestion}></RadioTFQuestion>}
            {CurrentQuestion.QuestionType === "2" && <InputQuestion nodeId={NodeID} courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataInput(data)} count={count} oder={parseInt(oder) + 1} datafibquestion={CurrentQuestion}></InputQuestion>}
            {CurrentQuestion.QuestionType === "3" && <RadioQuestion nodeId={NodeID} courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataRadioN(data)} count={count} oder={parseInt(oder) + 1} datamcqquestion={CurrentQuestion}></RadioQuestion>}
            {CurrentQuestion.QuestionType === "4" && <ChecksQuestion nodeId={NodeID} courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataCheck(data.toString())} count={count} oder={parseInt(oder) + 1} datamrqquestion={CurrentQuestion}></ChecksQuestion>}
            {CurrentQuestion.QuestionType === "5" && <SentenceQuestion nodeId={NodeID} courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataSentence(data)} count={count} oder={parseInt(oder) + 1} dataSentence={CurrentQuestion} title={CurrentQuestion.Question} anwesersleft={CurrentQuestion.QuestionDetail?.Table} anwesers1={CurrentQuestion.QuestionDetail?.Table1} anwesers={CurrentQuestion.QuestionDetail?.Table}></SentenceQuestion>}
            {CurrentQuestion.QuestionType === "6" && <SortQuestion nodeId={NodeID} courseId={courseId} useID={useID} time5s={time5s} onchange={data => setdataSort(data)} count={count} oder={parseInt(oder) + 1} dataSort={CurrentQuestion} title={CurrentQuestion.Question} anwesers1={CurrentQuestion.QuestionDetail?.Table1} anwesers={CurrentQuestion.QuestionDetail?.Table}></SortQuestion>}
            {CurrentQuestion.QuestionType === "7" && <CkeditorQuestion nodeId={NodeID} CourseCode={CourseCode} courseId={courseId} useID={useID} time5s={time5s} onChange={data => setdataCkeditor(data)} count={count} oder={parseInt(oder) + 1} datadquestion={CurrentQuestion}></CkeditorQuestion>}
        </>)
    }
    const renderTitle = (CurrentQuestion) => {
        return (<>
            {CurrentQuestion.QuestionType === "1" && 'Chọn đúng/sai'}
            {CurrentQuestion.QuestionType === "2" && 'Điền vào chỗ trống'}
            {CurrentQuestion.QuestionType === "3" && 'Trắc nghiệm'}
            {CurrentQuestion.QuestionType === "4" && 'Nhiều câu trả lời'}
            {CurrentQuestion.QuestionType === "5" && 'Nối đáp án đúng?'}
            {CurrentQuestion.QuestionType === "6" && 'Sắp xếp câu '}
            {CurrentQuestion.QuestionType === "7" && 'Tự luận'}
        </>)
    }
    const renderDirectional = (value) => {
        return (
            value.map((item, index) => {
                if (index < value.length - 1) {
                    return (
                        <>
                            <span style={{ cursor: 'pointer', marginLeft: '2rem', borderRadius: '50%', fontSize: '17px' }} onClick={() => getCurrentQuestion(questionIdList, questionTypeList, index, bodyParams, 'directional', index)} className={directional == ('directional' + index) ? 'badge bg-primary' : (item == 'A' ? (item == 'M' ? 'badge bg-danger' : 'badge bg-success') : (item == 'M' ? 'badge bg-danger' : 'badge bg-secondary'))}>{index + 1}</span>
                            {/* <button  className="directional">{index + 1}</button> */}
                        </>
                    )
                }
            })
        )
    }
    const getTextQ = (item) => {
        let index1 = item.indexOf('<div')
        let index2 = item.indexOf('</div>')
        let index3 = item.indexOf('<span')
        let index4 = item.indexOf('</span>')
        let index5 = item.indexOf('<p')
        let index6 = item.indexOf('/p>')
        let index7 = item.indexOf('<u')
        let index8 = item.indexOf('</u>')
        if (index1 >= 0 || index2 >= 0) {
            let textKey = item.slice(index1, index2 + 7)
            let text = item.replace(textKey, '...')
            return text
        }
        else if (index3 >= 0 || index4 >= 0) {
            let textKey = item.slice(index3, index4 + 7)
            let text = item.replace(textKey, '...')
            return text
        }
        else if (index5 >= 0 || index6 >= 0) {
            let newStr = item.replace(/\<p\>|\<\/p\>/g, "");
            return newStr
        }
        else {
            return item
        }

    }
    const getTextQhtml = (item) => {
        let index1 = item.indexOf('<div')
        let index2 = item.indexOf('</div>')
        let index3 = item.indexOf('<span')
        let index4 = item.indexOf('</span>')
        let index5 = item.indexOf('<u')
        let index6 = item.indexOf('</u>')
        if (index1 >= 0 || index2 >= 0) {
            let textKey = item.slice(index1, index2 + 7)
            let text = item.replace(textKey, '...')
            return text
        }
        else if (index3 >= 0 || index4 >= 0) {
            let textKey = item.slice(index3, index4 + 7)
            let text = item.replace(textKey, '...')
            return text
        }
        else if (index5 >= 0 || index6 >= 0) {
            let textKey = item.slice(index5, index6 + 7)
            let text = item.replace(textKey, '...')
            return text
        }
        else {
            return item
        }

    }
    const renderDirectionalTextQ = (value) => {
        return (
            value.map((item, index) => {
                if (index < value.length - 1) {
                    return (
                        <>
                            <Tooltip style={{width:'30%'}} position="bottom" target={".lh-tight-" + index}>
                                <div dangerouslySetInnerHTML={{ __html: getTextQhtml(item) }} ></div>
                            </Tooltip>
                            <a className={"list-group-item list-group-item-action active py-3 lh-tight "} style={directional == ('directional' + index) ? {} : { backgroundColor: 'rgb(253, 255, 253)', color: 'black', borderBottom: '1px solid #c9c9c9', borderColor: '#c9c9c9' }} onClick={() => getCurrentQuestion(questionIdList, questionTypeList, index, bodyParams, 'directional', index)} aria-current="true">

                                <span className="media align-items-center" style={{ marginTop: '0px' }}>
                                    <span className="media-left">
                                        <span className="btn btn-white btn-circle circle" style={(answeredListID[index] == 'A' ? (answeredListID[index] == 'M' ? { color: 'white', backgroundColor: 'orangered', borderRadius: '50%', border: '1px solid #c9c9c9' } : { color: 'white', backgroundColor: 'green', borderRadius: '50%', border: '1px solid #c9c9c9' }) : (answeredListID[index] == 'M' ? { color: 'white', backgroundColor: 'orangered', borderRadius: '50%', border: '1px solid #c9c9c9' } : { backgroundColor: 'rgb(253, 255, 253)', borderRadius: '50%', border: '1px solid #c9c9c9' }))}> {index + 1}</span>
                                    </span>
                                    <div className={"text-question-layout-right media-body-navigation " + "lh-tight-" + index}><div dangerouslySetInnerHTML={{ __html: getTextQhtml(item) }}></div></div>
                                </span>
                            </a>
                        </>
                    )
                }
            })
        )
    }
    function toHHMMSS(time) {
        var sec_num = parseInt(time, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }
    const submitform = async (IdList, TypeList, index, body) => {
        let error = false
        let temp = countRef.current.getTimeCountDown();
        setCount(temp)
        let currentQ = {
            CurrentQuestionId: IdList[index].toString(),
            QuestionId: IdList[index].toString(),
            QuestionType: TypeList[index].toString(),
            LastAttemptIndex: (index),
            Index: (index),
            CurrentIndex: (index),
        }
        let currentQ1 = {
            CurrentQuestionId: IdList[index].toString(),
            QuestionId: IdList[index].toString(),
            QuestionType: TypeList[index].toString(),
            LastAttemptIndex: (index),
            Index: (index),
            CurrentIndex: (index),
            "Submit": false,
            "FinalizeAssessment": "False",
            Mode: "open",
        }
        let body1 = { ...body, ...currentQ }
        let body2 = { ...body, ...currentQ1 }
        let result = await performExamService.getassessmentreattemptmessage(body1);
        let answerSBF = await answer(body2, markQuestion, count, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor, '')
        error = answerSBF?.error
        if (error !== true) {
            if (result.data?.AssessmentReattemptMessageDetail.Table[0]?.NM_MN_PSSNG_MRKS > 0) {
                setformSubmit(1)
            }
            const action = setShowReview(true)
            dispatch(action);
            //setvisibleSubmit(true)
        }
        else {
            alert(answerSBF?.result)
        }
    }
    const loadExam = (data) => {
        ////console.log('loadExam', data)
    }
    const autosubmissionlefttime = async (time, body) => {
        //console.log('paramsSubmit', body)
        let pramaautosubmissionlefttime = { ...body, ...{ TimeAllowed: time, AssessmentAttemptLeftTime: time } }
        await performExamService.setautosubmissionlefttime(pramaautosubmissionlefttime)
    }
    useEffect(() => {
        if (visibleDialog1 == true) {
            window.addEventListener("keydown", handleKeyPress);
            return () => {
                window.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [hideExam, visibleDialog1]);
    // useEffect(() => {
    //     window.onblur = () => {
    //         if (document.visibilityState === 'visible') {
    //             console.log('Switched to another tab');
    //         }
    //     };
    // }, []);
    // useEffect(() => {
    //     const handleEscKey = (event) => {
    //         if (event.key === 'F11') {
    //             event.preventDefault();
    //         }
    //     };

    //     document.addEventListener('keydown', handleEscKey);

    //     return () => {
    //         document.removeEventListener('keydown', handleEscKey);
    //     };
    // }, []);
    const handleKeyPress = async (event) => {
        const paramsopenassessment = {
            "CourseLaunchId": CourseLaunch_Id,
            "NodeId": course_id,
            "StudentId": 0,
        }

        if (event.key === "Alt") {
            let openassessment = await performExamService.openassessment(paramsopenassessment);
            if (openassessment.data.BlockedAssessment == "False") {
                console.log('Bạn vửa ấn alt')
            }
            else {
                if (hideExam < 2) {
                    let i
                    i = hideExam
                    i++
                    let a = 3 - i
                    alert('Bạn đã nhấn ' + i + ' lần phím Alt, nếu nhấn vào ' + a + ' lần nữa bạn sẽ bị đăng xuất khỏi bài thi.')
                    const action = setHideExam(i)
                    dispatch(action);
                }
                else {
                    //console.log('hideExam', hideExam)
                    alert('Bạn đã nhấn Alt 3 lần nên bạn sẽ thoát khỏi bài thi.')
                    let bodyAltKey = {
                        "AltKeyLogout": true,
                        "CourseLaunchId": CourseLaunch_Id,
                        "NodeId": course_id,
                    }
                    await performExamService.finalizeassessment(bodyAltKey)
                    const action = setHideExam(0)
                    dispatch(action);
                    const action1 = setvisibleDialog(false)
                    dispatch(action1);
                    const action2 = setShowReview(false)
                    dispatch(action2);
                }
            }

        }
    }
    const submit30s = async (data, body) => {
        if (offautosb == false) {
            let currentQ = {
                CurrentQuestionId: questionIdList[oder].toString(),
                QuestionId: questionIdList[oder].toString(),
                QuestionType: questionTypeList[oder].toString(),
                LastAttemptIndex: (oder),
                Index: (oder),
                Mode: "open",
                "IsSubmitD": false,
            }
            const paramAnswer = { ...body, ...currentQ }
            if (time30s != '') {
                await answer30s(paramAnswer, markQuestion, time30s, data, selectedQuestion, showSentenceQuestion)
            }
        }

    }
    useEffect(() => {
        if (selectedQuestion.QuestionType == '1') {
            submit30s(dataRadioTF, bodyParams)
        }
        if (selectedQuestion.QuestionType == '2') {
            submit30s(dataInput, bodyParams)
        }
        if (selectedQuestion.QuestionType == '3') {
            submit30s(dataRadioN, bodyParams)
        }
        if (selectedQuestion.QuestionType == '4') {
            submit30s(dataCheck, bodyParams)
        }
        if (selectedQuestion.QuestionType == '5') {
            submit30s(dataSentence, bodyParams)
        }
        if (selectedQuestion.QuestionType == '6') {
            submit30s(dataSort, bodyParams)
        }
        if (selectedQuestion.QuestionType == '7') {
            submit30s(dataCkeditor, bodyParams)
        }
    }, [time30s]);
    // useEffect(() => {
    //     if(NodeID>0){
    //         if (offautosb == false) {
    //             console.log('time5s',time5s)
    //             upDateDataLocal(useID, NodeID, time5s,visibleDialog1)
    //         }
    //     }

    // }, [time5s,NodeID,visibleDialog1]);
    useEffect(() => {
        if (submissionlefttime !== "")
            autosubmissionlefttime(submissionlefttime, paramsSubmit)
    }, [submissionlefttime]);

    const headerExam = () => {
        return (
            <>
                <div className="d-flex justify-content-end" >
                    <div className="displayedTime mr-5"><h1 style={{ color: 'red' }}>
                        {
                            textCountDown
                        }</h1></div>
                    <Button style={{ marginRight: '1rem', float: 'right', justifyContent: 'end' }} type="button" className="btn btn-primary pr-4 pl-4 pt-3 pb-3"
                        onClick={() => {
                            setvisibleSubmit(true)
                            const action = setShowReview(true)
                            dispatch(action);
                        }}> <span style={{ fontSize: 'large' }}>Nộp bài</span> </Button>
                </div>
            </>
        )


    }
    const headerCourseName = () => {
        return (
            <>
                <div className="d-flex bd-highlight">
                    <div className="me-auto bd-highlight align-self-center">{titleExam}</div>
                    <div className="bd-highlight">
                        <div class="bd-highlight">
                            <span dangerouslySetInnerHTML={{ __html: userFirstName + ' ' + userMiddleName + ' ' + userLastName }}></span>
                        </div>

                        <div class="bd-highlight">{EmailId}</div>
                    </div>
                </div>
            </>
        )
    }
    const submitTime = async (data) => {
        if (offautosb == false) {
            if (visibleDialog1 == true) {
                try {
                    const paramAnswer1 = bodyParams
                    const cc2 = {
                        ...paramAnswer1, ...{
                            CurrentQuestionId: questionIdList[oder].toString(),
                            QuestionId: questionIdList[oder].toString(),
                            QuestionType: questionTypeList[oder].toString(),
                            LastAttemptIndex: (oder + 1),
                            Index: (oder + 1),
                            CurrentIndex: (oder + 1),
                            "Submit": true,
                            "FinalizeAssessment": "False",
                            Mode: "open",
                        }
                    }
                    localStorage.removeItem('timelocal' + '_' + useID + '_' + course_id);
                    let result = await answer(cc2, markQuestion, count, dataRadioTF, dataInput, selectedQuestion, dataRadioN, dataCheck, dataSentence, showSentenceQuestion, dataSort, dataCkeditor, 'submit')
                    if (result.result1.data.AssessmentReattemptMessageDetail.Table[0]?.NM_MN_PSSNG_MRKS <= result.result2.data.AssessmentFeedbackReportDetail.Table1[0]?.FL_AGGRGT_MRKS_OBTND){
                        const action = setCondition(true)
                        dispatch(action);
                    }
                    const action1 = setVisibleSubmitPassPoints(true)
                    dispatch(action1);
                    const action = setShowReview(false)
                    dispatch(action);
                    const action2 = setvisibleDialog(false)
                    dispatch(action2);
                    const action3 = setformAutoSubmit(true)
                    dispatch(action3);
                } catch (error) {
                }
            }
        }

    }
    const updateIndexDB = () => {
        if (selectedQuestion.QuestionType == 7) {
            let date = new Date()
            let time = date.getTime()
            let answer = {
                id: useID + "_" + NodeID + "_" + selectedQuestion.QuestionId,
                question_id: selectedQuestion.QuestionId,
                useID_nodeId: useID + "_" + NodeID,
                answer: dataCkeditor,
                time: time
            }
            addOrUpdate(answer)
        }
    }
    useEffect(() => {
        if (count == 0) {
            submitTime()
        }
    }, [count]);

    return (
        <>

            {/* {props.visibleExam == true ? <NetworkDetector
                config={configNetworkStatus}
                onChange={onNetworkStatusChange}
            /> : ''} */}
            <Dialog focusOnShow={false} closeOnEscape={false} blockScroll={true} resizable={true} draggable={false} header={headerCourseName} visible={visibleDialog1} style={{ backgroundColor: 'black', width: "100vw", height: "100vw", maxHeight: '100%' }} onHide={() => {
                const action = setvisibleDialog(false)
                dispatch(action); props.onCloseExam();
                const action1 = setHideExam(0)
                dispatch(action1);
            }}>
                <div style={{ backgroundColor: '#cbcbcb' }}>
                    <div className="row" style={{}}>
                        <div id="information" className="col-9 pl-3 pb-0 pr-0">
                            <div className="d-flex flex-column bd-highlight ">
                                <div className="p-2 bd-highlight">

                                    <div className="card-group" style={{ border: '1px solid #c9c9c9' }}>
                                        <div className="body-information  card">
                                            <div className="card-body-1">
                                                <h6 className="title-information card-title">{toHHMMSS(dataResumeas?.TimeAllowed)}</h6>
                                                <p className="parameter card-text">Tổng thời gian</p>
                                            </div>
                                        </div>
                                        <div className=" body-information card">
                                            <div className="card-body-1">
                                                <h6 className="title-information card-title" style={{ color: '#2bf528' }}>{dataResumeas?.QuestionCount}</h6>
                                                <p className="parameter card-text">Tổng số câu hỏi</p>
                                            </div>
                                        </div>
                                        <div className="body-information card">
                                            <div className="card-body-1">
                                                <h6 className="title-information card-title" style={{ color: '#ff3f36' }}>{openassessment?.TotalMarks}</h6>
                                                <p className="parameter card-text">Tổng điểm</p>
                                            </div>
                                        </div>
                                        <div className="body-information card">
                                            <div className="card-body-1">
                                                <h6 className="title-information card-title" style={{ color: 'rgb(5 82 255)' }}>{openassessment?.PassingMark}</h6>
                                                <p className="parameter card-text">Điểm vượt qua</p>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body-1">
                                                <h6 className="title-information card-title" style={{ color: 'rgb(5 82 255)' }}>{openassessment?.NegativeMarking}%</h6>
                                                <p className="parameter card-text">Điểm trừ</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="col-3 pb-0 pr-3 pl-0">
                            <div className="d-flex flex-column bd-highlight ">
                                <div className="p-2 bd-highlight">

                                    <div className="card d-flex" style={{ border: '1px solid #c9c9c9' }}>
                                        <BlockComponent disabled={loading}>
                                            <div className="p-2" style={{ paddingBottom: 0 }}>
                                                <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                                                    <div className="oclock bg-transparent ">
                                                        <h5 className="oclock-title m-0 pb-1">THỜI GIAN</h5>

                                                        <Clock style={{ color: 'red' }} ref={countRef} time={count} timdeDF={timdeDF} settime30s={data => settime30s(data)} onChange={data => setCount(data)} setautosubmissionlefttime={data => setsubmissionlefttime(data)}
                                                        // settimelocal={data => {
                                                        //     settime5s(data);
                                                        // }} 
                                                        />
                                                    </div>

                                                    <div className="">
                                                        <button onClick={() => submitform(questionIdList, questionTypeList, oder, bodyParams)} style={{ float: 'right', justifyContent: 'end' }} type="button" className="btn btn-primary pr-4 pl-4 pt-3 pb-3">
                                                            <span style={{ fontSize: 'large' }}>Nộp bài</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </BlockComponent>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-9 pl-3 pb-0 pr-0 pt-0" >
                            <div className="d-flex flex-column bd-highlight mb-3">
                                <div className="p-2 bd-highlight">
                                    <div className="card" style={{ border: '1px solid #c9c9c9' }}>
                                        <div className="card"  >
                                            <BlockComponent disabled={loading}>
                                                <div className="question-title card-header bg-transparent">
                                                    <div className="media align-items-center" style={{ marginTop: '0px' }}>
                                                        <div className="question-form media-left">
                                                            <span class="badge bg-secondary" style={{ fontSize: '14px' }}>{renderTitle(selectedQuestion)}</span>
                                                        </div>
                                                        <div className="media-body-navigation">

                                                        </div>
                                                        <div className="media-right" style={{ float: 'right', fontSize: '18px' }}>
                                                            <span>Điểm:&nbsp;{selectedQuestion?.QuestionLevelMark}</span>
                                                            &nbsp;&nbsp;
                                                            {openassessment.AllowFlagging == 'True' ?
                                                                <BsFlagFill className={markQuestion == false ? 'mark-question' : 'mark-question-1'} onClick={() => setmarkQuestion(!markQuestion)} /> :
                                                                <></>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card" style={{ height: 'calc(100vh - 325px)' }}>
                                                    <LoadingPanel loading={loading}>
                                                        {renderCurrentQuestion(selectedQuestion, oder)}
                                                    </LoadingPanel>
                                                </div>
                                                <div className="btn-question card-footer bg-transparent" style={{ minHeight: '55px' }}>
                                                    {oder == 0 ? '' : <button style={{ float: 'left' }} type="button" onClick={() => getCurrentQuestion(questionIdList, questionTypeList, oder, bodyParams, 'prev')} className="btn btn-outline-dark">Quay lại</button>}
                                                    {oder == questionIdList.length - 2 ? '' : <button style={{ float: 'right' }} type="button" onClick={() => getCurrentQuestion(questionIdList, questionTypeList, oder, bodyParams, 'next')} className="btn btn-success">Tiếp theo</button>}
                                                </div>
                                            </BlockComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 pb-0 pr-3 pl-0 pt-0" >
                            <div className="d-flex flex-column bd-highlight mb-3">
                                <div className="p-2 bd-highlight ask-question">
                                    <div className="card" style={{ padding: 0, border: '1px solid #c9c9c9', borderTop: '1px solid #a8a8a8' }}>
                                        <div className="card-body" style={{ marginTop: '-1rem' }}>
                                            <p className="card-text pt-2" style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <span><BsFillCircleFill style={{ color: 'green' }} /> Đã trả lời</span>
                                                {openassessment.AllowFlagging == 'True' ?
                                                    <span><BsFillCircleFill style={{ color: '#ff8100' }} /> Đã đánh dấu</span> : <></>}
                                                <span><BsFillCircleFill style={{ color: 'white', border: '1px solid black', borderRadius: '50%' }} /> Chưa trả lời
                                                </span>
                                            </p>
                                        </div>
                                        <BlockComponent disabled={loading} >
                                            <div
                                                // id="list-example"
                                                // data-spy="scroll"
                                                // data-target="#list-example"
                                                // data-offset={0}
                                                className="overflow-y-auto w-100 list-group list-group-flush border-bottom scrollspy-example" style={{ height: 'calc(100vh - 298px)' }}>
                                                {renderDirectionalTextQ(questionTxtList)}
                                            </div>
                                        </BlockComponent>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Dialog>
            {/* {visibleSubmit === true && <NotificationSubmit NodeID={NodeID} courseId={courseId} useID={useID} essay={essay} openassessment={openassessment} onchange={data => { props.onCloseExam(); setvisibleSubmit(false) }} close={data => setvisibleSubmit(data)} course_id={course_id} CourseLaunch_Id={CourseLaunch_Id} visibleSubmit={visibleSubmit} AttemptsLeft={AttemptsLeft} questionIdList={questionIdList} questionTypeList={questionTypeList} paramAnswer={paramsSubmit} markQuestion={markQuestion} dataRadioTF={dataRadioTF} dataInput={dataInput} selectedQuestion={selectedQuestion} dataRadioN={dataRadioN} showSentenceQuestion={showSentenceQuestion} dataCkeditor={dataCkeditor} dataSort={dataSort} dataSentence={dataSentence} dataCheck={dataCheck} count={count} courseLaunchId={dataResumeas?.CourseLaunchId} nodeId={dataResumeas?.NodeId} studentId={dataResumeas?.StudentId} formSubmit={formSubmit}></NotificationSubmit>} */}
            {visibleSubmit === true && <NotificationSubmit NodeID={NodeID} ContentId={ContentId} courseId={courseId} useID={useID} essay={essay} openassessment={openassessment} onchange={data => { props.onCloseExam(); setvisibleSubmit(false) }} close={data => setvisibleSubmit(data)} course_id={course_id} CourseLaunch_Id={CourseLaunch_Id} visibleSubmit={visibleSubmit} AttemptsLeft={AttemptsLeft} questionIdList={questionIdList} questionTypeList={questionTypeList} paramAnswer={paramsSubmit} markQuestion={markQuestion} dataRadioTF={dataRadioTF} dataInput={dataInput} selectedQuestion={selectedQuestion} dataRadioN={dataRadioN} showSentenceQuestion={showSentenceQuestion} dataCkeditor={dataCkeditor} dataSort={dataSort} dataSentence={dataSentence} dataCheck={dataCheck} count={count} courseLaunchId={dataResumeas?.CourseLaunchId} nodeId={dataResumeas?.NodeId} studentId={dataResumeas?.StudentId} formSubmit={formSubmit}></NotificationSubmit>}
            {/* <Thongbaosubmit tbSubmit={visible} onchange={() => setvisible(false)}></Thongbaosubmit> */}
            {/* <Dialog className='sidebar-header-none' visible={showReview} fullScreen > */}
            <Dialog
                header={headerExam}
                visible={showReview}
                style={{ width: '75vw' }}
                // onHide={() => setvisible(false)} 
                onHide={() => {
                    const action = setShowReview(false)
                    dispatch(action);
                }} >
                {
                    <>
                        {/* <Button style={{ position: 'absolute', right: '10px', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => {
                            const action = setShowReview(false)
                            dispatch(action);
                        }} /> */}
                        <ReviewExam courseName={courseName} contentName={contentName} strquestionIdList={strquestionIdList} strquestionTypeList={strquestionTypeList} CourseCode={CourseCode} dataResumeas={dataResumeas} openassessment={openassessment} answeredListID={answeredListID} sortQuestionReview={sortQuestionReview} CourseLaunch_Id={CourseLaunch_Id} NodeId={course_id} ContentId={ContentId} questionTypeList={questionTypeList} questionIdList={questionIdList} />
                    </>
                }
            </Dialog>
            {/* <DemoThucHienThi CourseLaunch_Id={CourseLaunch_Id} course_id={course_id} ContentId={ContentId}></DemoThucHienThi> */}
            {/* <NotificationSubmitPassPoints NodeID={NodeID} AttemptsLeft={AttemptsLeft} openassessment={openassessment} CourseLaunch_Id={CourseLaunch_Id} course_id={course_id} ContentId={ContentId}></NotificationSubmitPassPoints> */}
            <Err></Err>
        </>

    )
}
Exam.propTypes = {

    onCloseExam: PropTypes.func

};
Exam.defaultProps = {
    onCloseExam: () => { }
}
export default Exam;
