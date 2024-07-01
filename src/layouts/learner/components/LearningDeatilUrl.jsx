
import React, { useState, useEffect, useRef, Component } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Image, ImageNotifyDef } from 'components/Image';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressBar } from 'primereact/progressbar';
import { classNames } from 'primereact/utils';
import styles from './style/learningDetail.module.scss';
import { OpenAssessmentContainer } from './OpenAssessmentContainer';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
import { learningService } from 'services/learningService';
import { Dialog } from 'primereact/dialog';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { Toast } from 'primereact/toast';
import { openWindow } from "shared/utils";
import { FormHomeWorkContainer } from './FormHomeWorkContainer';
import { FormFeedBackContainer } from './FormFeedBackContainer';
import { RatingContainer } from './RatingContainer';
import { ConversationContainer } from './ConversationContainer';
import Exam from 'layouts/others/components/Exam';
import { OverlayPanel } from 'primereact/overlaypanel';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { Link } from 'react-router-dom';
import { setvisibleDialog } from 'store/perFormExam/perFormExam';
import { useSelector, useDispatch } from 'react-redux';
import { OpenVideoDisplay } from './OpenVideoDisplay';
import './style/custom-tabview.scss';
import { appSetting } from "shared/app-settings";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import LearningDetailNodeItem from './LearningDetailNodeItem';
import { FormDetailFeedBack } from './FormDetailFeedBack';
import { OpenCheckList } from './OpenCheckList';
import { setDetaiLearn } from 'store/detaillearning/detaillearningSlice';
import { useNavigate } from 'react-router-dom';
import ShareCourse from 'layouts/others/components/ShareCourse';
import { overViewService } from 'services/overViewService';
import NotificationSubmitPassPoints from 'layouts/others/components/Submit/notificationSubmitPassPoints';
import { right } from '@popperjs/core';
import { useLocation } from 'react-router-dom';
const Start1 = window.location.origin + '/images/play-icon.png';
const BackGround = window.location.origin + '/images/bg-39.jpg'
const IconItemDetail = window.location.origin + '/images/course-icon.png'
const LearningDeatilUrl = (props) => {
    const urlStr = window.location.href;
    var viTriCuoiCung = urlStr.lastIndexOf('-');
    const str_TypeLearner = urlStr[viTriCuoiCung - 1];
    const partStr = urlStr.split('-');
    const courseId1 = partStr[partStr.length - 1];
    // const isMyLearning = searchParams.get("isMyLearning");
    // const nameCourseType = searchParams.get("nameCourseType");
    const [isMyLearning, setisMyLearning] = useState('')
    const [nameCourseType, setnameCourseType] = useState('')
    const [idCourse, setidCourse] = useState(courseId1)
    const [typeLearner, setTypeLearner] = useState(str_TypeLearner)
    const navigate = useNavigate();
    const defaultCourse = {
        TotalRecords: 0,
        TotalUnreadRecords: 0,
        LearningItem: []
    }
    const defaultCourseNode = {
        TotalRecords: 0,
        TotalUnreadRecords: 0,
        LearningNodeItems: []
    }
    const userDefault = getCurrentUserDefault();
    const oauth = useSelector(state => state.oauth);
    const [loading, setLoading] = useState(false);
    const toastBR = useRef(null);
    const dispatch = useDispatch();
    const showBottomRight = (message) => {
        toastBR.current.show({ severity: 'success', summary: 'e.eps.lms.com thông báo', detail: message, life: 3000 });
    }
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleRightFB, setVisibleRightFB] = useState(false);
    const [visibleDetail, setvisibleDetail] = useState(false);
    const [visibleRightVideo, setVisibleRightVideo] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const visibleDialog1 = useSelector(state => state.exam.visibleDialog);
    const [btnKhongThamGia, setBtnKhongThamGia] = useState(false);
    const [btnPhanHoi, setBtnPhanHoi] = useState(false);
    const [expand, setExpand] = useState(true);
    const [activeIndex1, setActiveIndex1] = useState(props.tabIndex ? props.tabIndex : 0);
    const [courseName, setCourseName] = useState('');
    const [nodeName, setNodeName] = useState('');
    const [linkImage, setLinkImage] = useState('');
    const [CourseCode, setCourseCode] = useState('');
    const [courseLauchID, setcourseLauchID] = useState(0);
    const [courseType, setCourseType] = useState('');
    const [isRated, setIsRated] = useState(false);
    const [iLTStatus, setILTStatus] = useState('');
    const [nodeLauchID, setNodeLauchID] = useState(0);
    const [ConversationID, setConversationID] = useState(0);
    const [IsAttachConversation, setIsAttachConversation] = useState(false);
    const [studentLauchID, setStudentLauchID] = useState(0);
    const [sessionId, setSessionId] = useState(0);
    const [formId, setFormId] = useState(0);
    const [dataCourse, setDataCourse] = useState(defaultCourse);
    const [isMyLearningAPI, setIsMyLearningAPI] = useState(true);
    const [isMyLearningAPINode, setIsMyLearningAPINode] = useState(true);
    const [dataLopHocTT, setDataLopHocTT] = useState({
        Sessions: []
    });
    const [reason, setReason] = useState('');
    const [reasonKhongThamGia, setReasonKhongThamGia] = useState('');
    const [instructorInfo, setInstructorInfo] = useState('');
    const [dataCourseNode, setDataCourseNode] = useState(defaultCourseNode);
    const [dataNodeTree, setDataNodeTree] = useState([]);
    const op = useRef(null);
    const op1 = useRef(null);
    const op2 = useRef(null);
    const [dataDetail, setdataDetail] = useState([])
    const [isOpen] = useState(true);
    const [dataAnnouncement, setDataAnnouncement] = useState({
        AnnouncementItems: []
    });
    const [showShare, setshowShare] = useState(false);
    const [VisibleAddTopic, setVisibleAddTopic] = useState("");
    const [showMoreDescription, setshowMoreDescription] = useState(false);
    const [showMoreDescNotify, setshowMoreDescNotify] = useState(false);
    const [viewTypeProgram, setViewTypeProgram] = useState(false);
    const [lstIdFormFB, setlstIdFormFB] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [lstTree, setlstTree] = useState([]);
    const [dataFile, setdataFile] = useState([]);
    const [dataImg, setdataImg] = useState([]);
    const [visible, setvisible] = useState(false);
    const [dataNodeOrg, setDataNodeOrg] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [CertificateId, setCertificateId] = useState('');
    const [CertificateTemplateId, setCertificateTemplateId] = useState('');
    const [CourseLaunchId, setCourseLaunchId] = useState('');
    const [SelectedUserId, setSelectedUserId] = useState('');
    const [LearningType, setLearningType] = useState('CRS');
    const [SearchText, setSearchText] = useState('');
    const [OrderBy, setOrderBy] = useState('DT_CMPLTN_DT');
    const [Order, setOrder] = useState('desc');
    const [UserId, setUserId] = useState(0);
    const [IsMyTeam, setIsMyTeam] = useState(false);

    //datnh: fix close exam reload lại api 2 lần 
    // useEffect(() => {
    //     loadApi();
    // }, [idCourse]);

    useEffect(() => {
        if (visibleDialog1 == false) {
            let url = window.location.href;
            var viTriCuoiCung1 = url.lastIndexOf('-');
            const str_TypeLearner1 = url[viTriCuoiCung1 - 1];
            const parts = url.split('-');
            const courseId = parts[parts.length - 1];
            setidCourse(courseId)
            setcourseLauchID(courseId)
            setTypeLearner(str_TypeLearner1)

            loadApi();
        }
    }, [visibleDialog1]);

    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);

    // function FormatDateTime(now) {
    //     var date = now.toJSON().slice(0, 10);
    //     var nDate = date.slice(8, 10) + '/'
    //         + date.slice(5, 7) + '/'
    //         + date.slice(0, 4);
    //     setCurrentDate(nDate);
    //     console.log(nDate)
    // }

    const loadApi = async () => {
        setLoading(true);
        //tong quan
        switch (nameCourseType) {
            case "T":
                //Lớp học tập trung
                let resultTT = await learningService.getassignedclassroomtrainingdetail(idCourse);
                setDataLopHocTT(resultTT.data);
                setILTStatus(resultTT.data.ILTStatus);
                setLinkImage(resultTT.data.ILTImage);
                setConversationID(resultTT.data.ConversationId);
                setIsAttachConversation(resultTT.data.IsAttachConversation);
                break;
            default:
                let result = await learningService.getmylearningdetail(idCourse, isMyLearning);
                setDataCourse(result.data.LearningItem);
                setIsMyLearningAPI(result.data.IsMyLearning);
                setLinkImage(result.data.LearningItem.CourseImage);
                // setIsRated(result.data.LearningItem.IsRated);               
                setIsRated((result.data.LearningItem.Status == "Đang diễn ra" || result.data.LearningItem.Status == "Đã hoàn thành") ? true : false);

                setCourseCode(result.data.LearningItem.CourseCode);
                setConversationID(result.data.LearningItem.ConversationId);
                setIsAttachConversation(result.data.LearningItem.IsAttachConversation);
                setNodeName(result.data.LearningItem.CourseName);
                setCourseType(result.data.LearningItem.CourseType);
                setisMyLearning(result.data.LearningItem.ApprovalStatus)
                setnameCourseType(result.data.LearningItem.CourseType)
                setSelectedUserId(result.data.UserID);
                setCourseLaunchId(result.data.LearningItem.CourseLaunchId);
                setCertificateTemplateId(result.data.LearningItem.CertificateTemplateId);
                setCertificateId(result.data.LearningItem.CertificateId);
                setUserId(result.data.UserID)

                let result1 = await learningService.getmylearningnodedetail(idCourse, isMyLearning, props.isNodeClick);
                setDataCourseNode(result1.data);
                setIsMyLearningAPINode(result1.data.IsMyLearning);
                list_to_tree(result1.data.LearningNodeItems);
                setDataNodeOrg(result1.data.LearningNodeItems);
                setDataProgramFilter(result1.data.LearningNodeItems);

        }
        //nút thêm chủ đề tab Thảo luận
        //checkVisibleAddTopicBtn();

        //thong bao
        const paramAnnoucement = {
            "SortBy": "RECENT",
            "PageNumber": 1,
            "PageSize": 10,
            "CourseLaunchId": idCourse,
        }
        let result5 = await learningService.getcoursespecificannouncementlist(paramAnnoucement);
        setDataAnnouncement(result5.data);
        setLoading(false);
    }


    //#region Gửi lý do không tham gia
    const sentReasonKhongThamGia = async (data, reasonKhongThamGia) => {
        const params = {
            "IltId": data.Id,
            "WithdrawReason": reasonKhongThamGia,
        }
        await learningService.withdrawiltnomination(params);
        //có khả năng cần gọi lại API
        setBtnKhongThamGia(false);
        loadApi();
    };
    //#endregion

    //#region Confirm điểm danh
    const confirmDiemDanh = (ddCourseID, ddSeessionID) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn đánh dấu tham gia không?',
            accept: () => diemDanh(ddCourseID, ddSeessionID),
        });
    };
    const diemDanh = async (ddCourseID, ddSeessionID) => {
        const params = {
            "IltId": ddCourseID,
            "ILTSessionId": ddSeessionID,
        }
        await learningService.markpresentbyself(params);
        loadApi();
        showBottomRight("Điểm danh thành công!");
    }
    function getMinSeessionId(data) {
        var fristSeessionID = data[0].Id;
        return fristSeessionID;
    }
    //#endregion




    //#region Đề xuất, Truy cập
    //const [isMyLearning, setIsMyLearning] = useState(true); khong co tac dung gi, lúc true lúc false

    const accessLearning = async (data) => {
        const params = {
            "CourseID": data.CourseID,
            "courseName": data.CourseName,
            "gamificationPoints": data.GamificationPoints,
        }
        let result = await learningService.accessLearning(params);
        // let result = { data: "OK" };

        if (result.data == "OK") {

            // if (props.isFromMyLearning == true) {
            //     props.CloseLearningDetailCurrent();
            // }
            loadApi() //đăng ký học k chuyển về myLearning

            // let obj = data;
            // obj.VisibleRight = true;
            // obj.CourseId = obj.CourseID
            // obj.CourseType = obj.LearningType;
            //dispatch(setDetaiLearn(obj))
            //navigate('/learner/my-learning');
        } else {
            if (result.data) {
                window.alert(result.data);
            }
        }
    }
    const accessLearningLHTT = async (data) => {
        const params = {
            "IltId": data.Id,
            "courseName": data.Name,
        }
        let result = await learningService.classroomtrainingnominate(params);
        if (data.NominationStatus == null && props.isCatalogue == true) {
            let obj = data;
            obj.VisibleRight = true;
            obj.CourseId = data.Id;
            obj.CourseType = "T";
            dispatch(setDetaiLearn(obj))
            navigate('/learner/my-learning');
        }
        // else {
        //     if (result.data && result.data != "OK") { //show thông báo, cần ktra lại vì hình như api access lhtt không trả về message
        //         window.alert(result.data);
        //     }
        // }
    }
    //#endregion

    const CertificatePrint = () => {
        alert('haha')
    }

    const openInNewTab = async (url) => {
        // const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        // if (newWindow) newWindow.opener = null;
        let obj = {
            Mode: 'open',
            AuthKey: '',
            CertificateId: CertificateId,
            CertificateTemplateId: CertificateTemplateId,
            CourseLaunchId: CourseLaunchId,
            SelectedUserId: SelectedUserId,
            LearningType: LearningType,
            SearchText: SearchText,
            OrderBy: OrderBy,
            Order: Order,
            // UserId:UserId,
            // IsMyTeam:IsMyTeam
        };
        try {
            const response = await learningService.getimgcertificate(obj);
            const newTab = window.open('', '_blank');
            newTab.document.write(response.data);

            newTab.document.title = "Chứng chỉ hoàn thành khóa học";

        } catch (error) {
            console.error(error);
        }
    };

    const { control, formState: { errors }, handleSubmit, reset, getValues } = useForm({ reason, reasonKhongThamGia });

    const onSubmit = (data) => {
        reset();
    };
    const onSubmitKTG = (data) => {
        reset();
    };
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };



    const openFeedBack = async (sessionID) => {

        let arr = lstIdFormFB;
        arr.push(sessionID);
        setlstIdFormFB(arr);
        setVisibleRightFB(true);
        setSessionId(sessionID);
        setFormId(formId)
        // let obj = {
        //     ILTName: '',
        //     feedbackData: '',
        //     formID: '0',
        //     iltID: props.idCourse,
        //     sessionID: props.sessionID
        // }
        // let result = await learningService.getfeedbackformapi(obj);
    }
    const openDetailFeedBack = async (sessionID, data) => {

        setvisibleDetail(true);
        setSessionId(sessionID);
        let obj = {
            ILTName: '',
            feedbackData: '',
            formID: '',
            iltID: idCourse,
            sessionID: 0
        }
        if (data.Sessions.length > 1 && data.FilledSessions != "0") {
            obj.sessionID = sessionID
        }
        else {
            obj.sessionID = 0
        }
        let result = await learningService.getfeedbackdetailsapi(obj);
        setdataDetail(result.data)
    }
    const onHidenFormFeedback = async () => {
        setVisibleRightFB(false);


        loadApi();
    }



    const displayInstructorInfo = async (data) => {
        const iltID = idCourse;
        const loginCode = data.trim().split(' ');
        let resultInfo = await learningService.getinstructorbylogincode(iltID, loginCode[0]);
        setInstructorInfo(resultInfo.data);
    }
    function splitInstructor(dataInstructor) {
        if (dataInstructor) {
            const arrayInstructor = dataInstructor.split(",");
            return (
                arrayInstructor.map((item, index) => (
                    <div key={index} onClick={() => displayInstructorInfo(item)} >
                        {item}
                    </div>
                ))
            )
        }
    }

    function closeFullScreen() {
        setVisibleFullScreen(false);
        setVisibleExam(false);
        //loadApi(); lỗi load lại api 2 lần
    }
    function closeRight() {
        setVisibleRight(false);
        loadApi();
    }
    function closeRightFB() {
        setVisibleRightFB(false);
        loadApi();
    }
    function closeRightDetail() {
        setvisibleDetail(false);
        loadApi();
    }
    function closeRightVideo() {
        setVisibleRightVideo(false);
        loadApi();
    }
    function closeDetail() {
        setvisibleDetail(false);
        loadApi();
    }
    const [dataNode, setDataNode] = useState({});
    const [visibleExam, setVisibleExam] = useState(false)

    function setWithTabView() {
        const screenWidth = window.innerWidth;
        let withTab = nameCourseType == "T" ? screenWidth <= 767 ? '100%' : '377px' : screenWidth <= 767 ? '100%' : '483px';
        return withTab;
    }
    useEffect(() => {
        setWithTabView();
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [screenWidth]);

    function list_to_tree(list) {
        var map = {}, node, roots = [], i;
        if (list) {
            list = list.map(x => {
                x.children = [];
                x.isOpen = true;
                return x;

            })
        }
        for (i = 0; i < list.length; i += 1) {
            map[list[i].NodeID] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.ParentNodeID != 0) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.ParentNodeID]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        setDataNodeTree(roots);
        setDataProgramFilter(roots);
    }

    function isExpand(el) {
        let rootTemp = [...dataNodeTree];
        const index = rootTemp.findIndex(object => {
            return object.NodeID === el;
        });
        if (index != -1) {
            rootTemp[index].isOpen = !rootTemp[index].isOpen;
        }
        setDataNodeTree(rootTemp);


        // let rootTemp = [...dataNodeTree];
        // //Đóng tất cả các node
        // if (rootTemp) {
        //     rootTemp = rootTemp.map(x => {
        //         x.isOpen = false;
        //         return x;
        //     })
        // }

        // //Bật node được chọn
        // const index = rootTemp.findIndex(object => {
        //     return object.NodeID === el;
        // });
        // if (index != -1) {
        //     rootTemp[index].isOpen = !rootTemp[index].isOpen;
        //     //rootTemp[!index].isOpen = false;
        // }
        // setDataNodeTree(rootTemp);
        // setDataProgramFilter(rootTemp);
    }
    const KeySearch = (listKey) => {
        if (listKey != undefined) {
            var arrayResult = listKey.split(',');
            return (
                arrayResult.map((item, index) => {
                    if (index == arrayResult.length - 1) {
                        return (
                            <>
                                <a href={'/learner/my-learning-key?statusBy=&assignedFilterBy=&filterBy=0&keySearch=' + item} target='_blank'>{item}</a>
                                {/* <i><Link to={{ pathname: '/learner/my-learning-key', search: "?statusBy=&assignedFilterBy=&filterBy=&keySearch="+item }}>{item}</Link></i> */}
                            </>
                        )
                    }
                    else {
                        return (
                            <>
                                <a href={'/learner/my-learning-key?statusBy=&assignedFilterBy=&filterBy=0&keySearch=' + item} target='_blank'>{item}</a>,&nbsp;
                                {/* <i onClick={()=>{window.open(appSetting.ADDRESS_WEB+'/learner/my-learning-key?statusBy=&assignedFilterBy=&filterBy=0&keySearch='+item)}}>{item}</i>,&nbsp; */}
                            </>
                        )
                    }
                })
            )
        }

    }
    function toExamDetail(node) {
        setNodeLauchID(node.NodeID);
        setCourseName(node.courseName);
        if (node.NodeTypeName == "xAPI TinCan") {
            let fullname = oauth.UserFirstName + ' ' + oauth.UserMiddleName + ' ' + oauth.UserLastName
            let url3 = appSetting.ADMIN_URL + "/WCR/WCRContentDirectory/" + node.ResourceID + "/" + node.LaunchTinCan
                + '?endpoint=' + appSetting.END_POINT_XAPI
                + '&auth=Basic ' + appSetting.AUTH_XAPI
                + '&actor={ "name" : ["' + fullname + '"], "mbox" : ["' + oauth.EmailId + '"] }'
                + '&registration=' + node.ResourceGUID
                + '&activity_id=' + node.ActivityID;
            updatescormattempt(node);
            //openscorm(node);    
            const myWindow3 = openWindow(url3, 'openlms', window, 1280, 768); //mở scorm
            var timer = setInterval(function () {
                if (myWindow3.closed) {
                    clearInterval(timer);
                    trackCourseTinCan(node);
                    loadApi();
                }
            }, 1000);
            return;
        }
        switch (node.NodeTypeId) {
            case 5:
                //"NodeTypeName": "SCORM 1.2",
                updatescormattempt(node);
                openscorm(node);
                let token = oauth.token;
                let url = appSetting.ADMIN_URL + "/AppService/SCORM12Api/wrapper.html?corporateID=" + dataCourseNode.CorporateID + "&userID=" + node.UserID + "&culture=" + dataCourseNode.Culture + "&ipAddress=000.00.0.0&courseID=" + node.CourseID + "&nodeID=" + node.NodeID + "&contentID=" + node.ResourceID + "&token=" + token + "&wHeight=0&wWidth=0";
                const myWindow = openWindow(url, 'openlms', window, 1280, 768);
                var timer = setInterval(function () {
                    if (myWindow.closed) {
                        clearInterval(timer);
                        //trackCourse(node);
                        loadApi();
                    }
                }, 1000);
                break;
            case 6:
                //"NodeTypeName": "SCORM 1.3",
                let token2 = oauth.token;
                let url2 = appSetting.ADMIN_URL + "/AppService/SCORM13Api/wrapper.html?corporateID=" + dataCourseNode.CorporateID + "&userID=" + node.UserID + "&culture=" + dataCourseNode.Culture + "&ipAddress=000.00.0.0&courseID=" + node.CourseID + "&nodeID=" + node.NodeID + "&contentID=" + node.ResourceID + "&token=" + token2 + "&wHeight=0&wWidth=0";
                updatescormattempt(node);
                openscorm13(node);
                const myWindow2 = openWindow(url2, 'openlms', window, 1280, 768); //mở scorm
                var timer = setInterval(function () {
                    if (myWindow2.closed) {
                        clearInterval(timer);
                        //trackCourse(node);
                        loadApi();
                    }
                }, 1000);
                break;
            case 11:
                //"NodeTypeName": "Video",
                openVideoDisplay(node);
                break;
            case 4:
                //"NodeTypeName": "External Link" Reference Link,
                openLink_downloadFile(node);
                break;
            case 9:
                //"NodeTypeName": "Checklist", bài kiểm tra nhanh
                openCheckList(node);
                break;
            case 14:
                //"NodeTypeName": "Checklist", bài kiểm tra nhanh
                openCheckList(node);
                break;
            case 1:
                //"NodeTypeName": "Straight Content" HTML Content,
                openLink_downloadFile(node);
                break;
            case 2:
                //"NodeTypeName": "Bài tập",
                setVisibleRight(true);
                break;
            default:
                //NodeTypeId: 4
                //NodeTypeName: "Assessment"
                openNormalAssessment(node);
        }
        //#region 
        // if (node.NodeTypeId == 1) {
        //     //"NodeTypeName": "SCORM 1.2",
        //     updatescormattempt(node);
        //     openscorm(node);
        //     let token = oauth.token;
        //     let url = appSetting.ADMIN_URL + "/AppService/SCORM12Api/wrapper.html?corporateID=" + dataCourseNode.CorporateID + "&userID=" + node.UserID + "&culture=" + dataCourseNode.Culture + "&ipAddress=000.00.0.0&courseID=" + node.CourseID + "&nodeID=" + node.NodeID + "&contentID=" + node.ResourceID + "&token=" + token + "&wHeight=0&wWidth=0";
        //     const myWindow = openWindow(url, 'openlms', window, 1280, 768);

        //     var timer = setInterval(function () {
        //         if (myWindow.closed) {
        //             clearInterval(timer);

        //             //trackCourse(node);
        //             loadApi();
        //         }
        //     }, 1000);
        // } else if (node.NodeTypeId == 2) {
        //     //"NodeTypeName": "SCORM 1.3",
        //     let token = oauth.token;
        //     let url = appSetting.ADMIN_URL + "/AppService/SCORM13Api/wrapper.html?corporateID=" + dataCourseNode.CorporateID + "&userID=" + node.UserID + "&culture=" + dataCourseNode.Culture + "&ipAddress=000.00.0.0&courseID=" + node.CourseID + "&nodeID=" + node.NodeID + "&contentID=" + node.ResourceID + "&token=" + token + "&wHeight=0&wWidth=0";
        //     updatescormattempt(node);
        //     openscorm(node);

        //     const myWindow = openWindow(url, 'openlms', window, 1280, 768); //mở scorm
        //     var timer = setInterval(function () {

        //         if (myWindow.closed) {
        //             clearInterval(timer);

        //             //trackCourse(node);
        //             loadApi();
        //         }
        //     }, 1000);
        // } else if (node.NodeTypeId == 5) {
        //     //"NodeTypeName": "Video",
        //     openVideoDisplay(node);
        // } else if (node.NodeTypeId == 6) {
        //     //"NodeTypeName": "External Link",
        //     openLink_downloadFile(node);
        // } else if (node.NodeTypeId == 7 || node.NodeTypeId == 1014) {
        //     //"NodeTypeName": "Checklist", bài kiểm tra nhanh
        //     openCheckList(node);
        // } else if (node.NodeTypeId == 8) {
        //     //"NodeTypeName": "Straight Content",
        //     openLink_downloadFile(node);
        // } else if (node.NodeTypeId == 14) {
        //     //"NodeTypeName": "Bài tập",
        //     setVisibleRight(true);
        // } else {
        //     //NodeTypeId: 4
        //     //NodeTypeName: "Assessment"
        //     openNormalAssessment(node);
        // }
        //#endregion
    };

    const updatescormattempt = async (node) => {
        const params = {
            "NodeID": node.NodeID,
            "ParentNodeID": node.ParentNodeID,
            // "UserID": 41215,
            "CourseID": node.CourseID,
            "courseName": node.courseName,
            "UserFirstName": node.UserFirstName,
            "UserLastName": node.UserLastName,
            "CourseIsFirstAccess": node.CourseIsFirstAccess,
            // "corporateID": 0,
            "NodeName": node.NodeName,
            "NodeDescription": node.NodeDescription,
            "NodeOrder": node.NodeOrder,
            "ResourceID": node.ResourceID,
            "NodeResourceType": node.NodeResourceType,
            "NodeStartdate": node.NodeStartdate,
            "NodeEndDate": node.NodeEndDate,
            "NodeTypeName": node.NodeTypeName,
            "NodeTypeId": node.NodeTypeId,
            "NodeAccessibleDuration": node.NodeAccessibleDuration,
            "URL": node.URL,
            "NodeProgress": node.NodeProgress,
            "ESignAccepted": node.ESignAccepted,
            "ShowEsignModel": node.ShowEsignModel,
            "LastAccessDate": node.LastAccessDate,
            "MaxAttemptAllow": node.MaxAttemptAllow,
            "UserNotes": node.UserNotes,
            "AssignmentAnswerURL": node.AssignmentAnswerURL,
            "AssignmentAnswerFileName": node.AssignmentAnswerFileName,
            "tempFilePath": node.tempFilePath,
            "ReattemptAllowed": node.ReattemptAllowed,
            "Status": node.Status,
            "ReattemptLeft": node.ReattemptLeft,
            "ReattemptAllowFlag": node.ReattemptAllowFlag,
            "ScormZippedUrl": node.ScormZippedUrl,
            // "culture": null,
            "NodeActive": node.NodeActive,
            "IsDisabled": node.IsDisabled,
            "NodeDependancy": node.NodeDependancy,
            "IsBlended": node.IsBlended,
            "IsEvent": node.IsEvent,
            "IsEventSelected": node.IsEventSelected,
            "ILTId": node.ILTId,
            "ILTStatus": node.ILTStatus,
            "NominationStatus": node.NominationStatus,
            "Asssign": node.Asssign,
            "AttemptLeftCount": node.AttemptLeftCount,
            "IsCourseAccesed": node.IsCourseAccesed,
            "TrainingEvents": node.TrainingEvents,
            "NodeDependencies": node.NodeDependencies,
            "SkillDependencies": node.SkillDependencies,
            "MappedSkills": node.MappedSkills,
            "GamificationPoints": node.GamificationPoints,
            "ScormHeight": node.ScormHeight,
            "ScormWidth": node.ScormWidth,
            "ILTImage": node.ILTImage,
            "IsCourseExpired": node.IsCourseExpired,
            "ActionNodeIds": node.ActionNodeIds,
            "ScormOrientation": node.ScormOrientation,
            "MobileFriendly": node.MobileFriendly,
            "NodeDuration": node.NodeDuration,
            "IsOfflineMode": node.IsOfflineMode,
            "IsResetAttempts": node.IsResetAttempts,
            "ReasonForResetReattempst": node.ReasonForResetReattempst,
            "StatusForResetReattempstRequest": node.StatusForResetReattempstRequest,
            "IsShowResetReattempstButton": node.IsShowResetReattempstButton,
            "IsShowStatusForResetReattempstRequest": node.IsShowStatusForResetReattempstRequest,
            "IsMandatorycourse": node.IsMandatorycourse,
        }
        await learningService.updatescormattempt(params);
    }
    const openscorm = async (node) => {
        const params = {
            "NodeID": node.NodeID,
            "ParentNodeID": node.ParentNodeID,
            "UserID": userDefault.UserId,
            "CourseID": node.CourseID,
            "courseName": node.courseName,
            "UserFirstName": node.UserFirstName,
            "UserLastName": node.UserLastName,
            "CourseIsFirstAccess": node.CourseIsFirstAccess,
            "corporateID": node.corporateID,
            "NodeName": node.NodeName,
            "NodeDescription": node.NodeDescription,
            "NodeOrder": node.NodeOrder,
            "ResourceID": node.ResourceID,
            "NodeResourceType": node.NodeResourceType,
            "NodeStartdate": node.NodeStartdate,
            "NodeEndDate": node.NodeEndDate,
            "NodeTypeName": node.NodeTypeName,
            "NodeTypeId": node.NodeTypeId,
            "NodeAccessibleDuration": node.NodeAccessibleDuration,
            "URL": node.URL,
            "NodeProgress": node.NodeProgress,
            "ESignAccepted": node.ESignAccepted,
            "ShowEsignModel": node.ShowEsignModel,
            "LastAccessDate": node.LastAccessDate,
            "MaxAttemptAllow": node.MaxAttemptAllow,
            "UserNotes": node.UserNotes,
            "AssignmentAnswerURL": node.AssignmentAnswerURL,
            "AssignmentAnswerFileName": node.AssignmentAnswerFileName,
            "tempFilePath": node.tempFilePath,
            "ReattemptAllowed": node.ReattemptAllowed,
            "Status": node.Status,
            "ReattemptLeft": node.ReattemptLeft,
            "ReattemptAllowFlag": node.ReattemptAllowFlag,
            "ScormZippedUrl": node.ScormZippedUrl,
            "culture": node.culture,
            "NodeActive": node.NodeActive,
            "IsDisabled": node.IsDisabled,
            "NodeDependancy": node.NodeDependancy,
            "IsBlended": node.IsBlended,
            "IsEvent": node.IsEvent,
            "IsEventSelected": node.IsEventSelected,
            "ILTId": node.ILTId,
            "ILTStatus": node.ILTStatus,
            "NominationStatus": node.NominationStatus,
            "Asssign": node.Asssign,
            "AttemptLeftCount": node.AttemptLeftCount,
            "IsCourseAccesed": node.IsCourseAccesed,
            "TrainingEvents": node.TrainingEvents,
            "NodeDependencies": node.NodeDependencies,
            "SkillDependencies": node.SkillDependencies,
            "MappedSkills": node.MappedSkills,
            "GamificationPoints": node.GamificationPoints,
            "ScormHeight": node.ScormHeight,
            "ScormWidth": node.ScormWidth,
            "ILTImage": node.ILTImage,
            "IsCourseExpired": node.IsCourseExpired,
            "ActionNodeIds": node.ActionNodeIds,
            "ScormOrientation": node.ScormOrientation,
            "MobileFriendly": node.MobileFriendly,
            "NodeDuration": node.NodeDuration,
            "IsOfflineMode": node.IsOfflineMode,
            "IsResetAttempts": node.IsResetAttempts,
            "ReasonForResetReattempst": node.ReasonForResetReattempst,
            "StatusForResetReattempstRequest": node.StatusForResetReattempstRequest,
            "IsShowResetReattempstButton": node.IsShowResetReattempstButton,
            "IsShowStatusForResetReattempstRequest": node.IsShowStatusForResetReattempstRequest,
            "IsMandatorycourse": node.IsMandatorycourse,

            "contentID": node.ResourceID,
        }
        // let rsOpenscorm = await learningService.openscorm(params);
        // setInfoScorm(rsOpenscorm.data);
        await learningService.openscorm(params);
    }
    const openscorm13 = async (node) => {
        const params = {
            "NodeID": node.NodeID,
            "ParentNodeID": node.ParentNodeID,
            "UserID": userDefault.UserId,
            "CourseID": node.CourseID,
            "courseName": node.courseName,
            "UserFirstName": node.UserFirstName,
            "UserLastName": node.UserLastName,
            "CourseIsFirstAccess": node.CourseIsFirstAccess,
            "corporateID": node.corporateID,
            "NodeName": node.NodeName,
            "NodeDescription": node.NodeDescription,
            "NodeOrder": node.NodeOrder,
            "ResourceID": node.ResourceID,
            "NodeResourceType": node.NodeResourceType,
            "NodeStartdate": node.NodeStartdate,
            "NodeEndDate": node.NodeEndDate,
            "NodeTypeName": node.NodeTypeName,
            "NodeTypeId": node.NodeTypeId,
            "NodeAccessibleDuration": node.NodeAccessibleDuration,
            "URL": node.URL,
            "NodeProgress": node.NodeProgress,
            "ESignAccepted": node.ESignAccepted,
            "ShowEsignModel": node.ShowEsignModel,
            "LastAccessDate": node.LastAccessDate,
            "MaxAttemptAllow": node.MaxAttemptAllow,
            "UserNotes": node.UserNotes,
            "AssignmentAnswerURL": node.AssignmentAnswerURL,
            "AssignmentAnswerFileName": node.AssignmentAnswerFileName,
            "tempFilePath": node.tempFilePath,
            "ReattemptAllowed": node.ReattemptAllowed,
            "Status": node.Status,
            "ReattemptLeft": node.ReattemptLeft,
            "ReattemptAllowFlag": node.ReattemptAllowFlag,
            "ScormZippedUrl": node.ScormZippedUrl,
            "culture": node.culture,
            "NodeActive": node.NodeActive,
            "IsDisabled": node.IsDisabled,
            "NodeDependancy": node.NodeDependancy,
            "IsBlended": node.IsBlended,
            "IsEvent": node.IsEvent,
            "IsEventSelected": node.IsEventSelected,
            "ILTId": node.ILTId,
            "ILTStatus": node.ILTStatus,
            "NominationStatus": node.NominationStatus,
            "Asssign": node.Asssign,
            "AttemptLeftCount": node.AttemptLeftCount,
            "IsCourseAccesed": node.IsCourseAccesed,
            "TrainingEvents": node.TrainingEvents,
            "NodeDependencies": node.NodeDependencies,
            "SkillDependencies": node.SkillDependencies,
            "MappedSkills": node.MappedSkills,
            "GamificationPoints": node.GamificationPoints,
            "ScormHeight": node.ScormHeight,
            "ScormWidth": node.ScormWidth,
            "ILTImage": node.ILTImage,
            "IsCourseExpired": node.IsCourseExpired,
            "ActionNodeIds": node.ActionNodeIds,
            "ScormOrientation": node.ScormOrientation,
            "MobileFriendly": node.MobileFriendly,
            "NodeDuration": node.NodeDuration,
            "IsOfflineMode": node.IsOfflineMode,
            "IsResetAttempts": node.IsResetAttempts,
            "ReasonForResetReattempst": node.ReasonForResetReattempst,
            "StatusForResetReattempstRequest": node.StatusForResetReattempstRequest,
            "IsShowResetReattempstButton": node.IsShowResetReattempstButton,
            "IsShowStatusForResetReattempstRequest": node.IsShowStatusForResetReattempstRequest,
            "IsMandatorycourse": node.IsMandatorycourse,

            "contentID": node.ResourceID,
        }
        // let rsOpenscorm = await learningService.openscorm(params);
        // setInfoScorm(rsOpenscorm.data);
        await learningService.openscorm13(params);
    }
    const trackCourse = async (node) => {
        const params = {
            "NodeID": node.NodeID,
            "ParentNodeID": node.ParentNodeID,
            // "UserID": 41215,
            "CourseID": node.CourseID,
            "courseName": node.courseName,
            "UserFirstName": node.UserFirstName,
            "UserLastName": node.UserLastName,
            "CourseIsFirstAccess": node.CourseIsFirstAccess,
            // "corporateID": 0,
            "NodeName": node.NodeName,
            "NodeDescription": node.NodeDescription,
            "NodeOrder": node.NodeOrder,
            "ResourceID": node.ResourceID,
            "ResourceGUID": node.ResourceGUID,
            "NodeResourceType": node.NodeResourceType,
            "NodeStartdate": node.NodeStartdate,
            "NodeEndDate": node.NodeEndDate,
            "NodeTypeName": node.NodeTypeName,
            "NodeTypeId": node.NodeTypeId,
            "NodeAccessibleDuration": node.NodeAccessibleDuration,
            "URL": node.URL,
            "NodeProgress": node.NodeProgress,
            "ESignAccepted": node.ESignAccepted,
            "ShowEsignModel": node.ShowEsignModel,
            "LastAccessDate": node.LastAccessDate,
            "MaxAttemptAllow": node.MaxAttemptAllow,
            "UserNotes": node.UserNotes,
            "AssignmentAnswerURL": node.AssignmentAnswerURL,
            "AssignmentAnswerFileName": node.AssignmentAnswerFileName,
            "tempFilePath": node.tempFilePath,
            "ReattemptAllowed": node.ReattemptAllowed,
            "Status": node.Status,
            "ReattemptLeft": node.ReattemptLeft,
            "ReattemptAllowFlag": node.ReattemptAllowFlag,
            "ScormZippedUrl": node.ScormZippedUrl,
            // "culture": null,
            "NodeActive": node.NodeActive,
            "IsDisabled": node.IsDisabled,
            "NodeDependancy": node.NodeDependancy,
            "IsBlended": node.IsBlended,
            "IsEvent": node.IsEvent,
            "IsEventSelected": node.IsEventSelected,
            "ILTId": node.ILTId,
            "ILTStatus": node.ILTStatus,
            "NominationStatus": node.NominationStatus,
            "Asssign": node.Asssign,
            "AttemptLeftCount": node.AttemptLeftCount,
            "IsCourseAccesed": node.IsCourseAccesed,
            "TrainingEvents": node.TrainingEvents,
            "NodeDependencies": node.NodeDependencies,
            "SkillDependencies": node.SkillDependencies,
            "MappedSkills": node.MappedSkills,
            "GamificationPoints": node.GamificationPoints,
            "ScormHeight": node.ScormHeight,
            "ScormWidth": node.ScormWidth,
            "ILTImage": node.ILTImage,
            "IsCourseExpired": node.IsCourseExpired,
            "ActionNodeIds": node.ActionNodeIds,
            "ScormOrientation": node.ScormOrientation,
            "MobileFriendly": node.MobileFriendly,
            "NodeDuration": node.NodeDuration,
            "IsOfflineMode": node.IsOfflineMode,
            "IsResetAttempts": node.IsResetAttempts,
            "ReasonForResetReattempst": node.ReasonForResetReattempst,
            "StatusForResetReattempstRequest": node.StatusForResetReattempstRequest,
            "IsShowResetReattempstButton": node.IsShowResetReattempstButton,
            "IsShowStatusForResetReattempstRequest": node.IsShowStatusForResetReattempstRequest,
            "IsMandatorycourse": node.IsMandatorycourse,
            "IsNodeClick": node.IsNodeClick,
        }
        await learningService.trackcourse(params);
        loadApi();
    }

    const trackCourseTinCan = async (node) => {
        const params = {
            "NodeID": node.NodeID,
            "ParentNodeID": node.ParentNodeID,
            // "UserID": 41215,
            "CourseID": node.CourseID,
            "courseName": node.courseName,
            "UserFirstName": node.UserFirstName,
            "UserLastName": node.UserLastName,
            "CourseIsFirstAccess": node.CourseIsFirstAccess,
            // "corporateID": 0,
            "NodeName": node.NodeName,
            "NodeDescription": node.NodeDescription,
            "NodeOrder": node.NodeOrder,
            "ResourceID": node.ResourceID,
            "ResourceGUID": node.ResourceGUID,
            "NodeResourceType": node.NodeResourceType,
            "NodeStartdate": node.NodeStartdate,
            "NodeEndDate": node.NodeEndDate,
            "NodeTypeName": node.NodeTypeName,
            "NodeTypeId": node.NodeTypeId,
            "NodeAccessibleDuration": node.NodeAccessibleDuration,
            "URL": node.URL,
            "NodeProgress": node.NodeProgress,
            "ESignAccepted": node.ESignAccepted,
            "ShowEsignModel": node.ShowEsignModel,
            "LastAccessDate": node.LastAccessDate,
            "MaxAttemptAllow": node.MaxAttemptAllow,
            "UserNotes": node.UserNotes,
            "AssignmentAnswerURL": node.AssignmentAnswerURL,
            "AssignmentAnswerFileName": node.AssignmentAnswerFileName,
            "tempFilePath": node.tempFilePath,
            "ReattemptAllowed": node.ReattemptAllowed,
            "Status": node.Status,
            "ReattemptLeft": node.ReattemptLeft,
            "ReattemptAllowFlag": node.ReattemptAllowFlag,
            "ScormZippedUrl": node.ScormZippedUrl,
            // "culture": null,
            "NodeActive": node.NodeActive,
            "IsDisabled": node.IsDisabled,
            "NodeDependancy": node.NodeDependancy,
            "IsBlended": node.IsBlended,
            "IsEvent": node.IsEvent,
            "IsEventSelected": node.IsEventSelected,
            "ILTId": node.ILTId,
            "ILTStatus": node.ILTStatus,
            "NominationStatus": node.NominationStatus,
            "Asssign": node.Asssign,
            "AttemptLeftCount": node.AttemptLeftCount,
            "IsCourseAccesed": node.IsCourseAccesed,
            "TrainingEvents": node.TrainingEvents,
            "NodeDependencies": node.NodeDependencies,
            "SkillDependencies": node.SkillDependencies,
            "MappedSkills": node.MappedSkills,
            "GamificationPoints": node.GamificationPoints,
            "ScormHeight": node.ScormHeight,
            "ScormWidth": node.ScormWidth,
            "ILTImage": node.ILTImage,
            "IsCourseExpired": node.IsCourseExpired,
            "ActionNodeIds": node.ActionNodeIds,
            "ScormOrientation": node.ScormOrientation,
            "MobileFriendly": node.MobileFriendly,
            "NodeDuration": node.NodeDuration,
            "IsOfflineMode": node.IsOfflineMode,
            "IsResetAttempts": node.IsResetAttempts,
            "ReasonForResetReattempst": node.ReasonForResetReattempst,
            "StatusForResetReattempstRequest": node.StatusForResetReattempstRequest,
            "IsShowResetReattempstButton": node.IsShowResetReattempstButton,
            "IsShowStatusForResetReattempstRequest": node.IsShowStatusForResetReattempstRequest,
            "IsMandatorycourse": node.IsMandatorycourse,
            "IsNodeClick": node.IsNodeClick,
            "ActivityID": node.ActivityID
        }
        await learningService.trackcoursetincan(params);
        loadApi();
    }

    const openVideoDisplay = async (node) => {
        if (node.MaxAttemptAllow.includes('0/') && node.AttemptLeftCount == 0) {
            alert("Video đã hết số lượt truy cập")
        } else {
            trackCourse(node);
            setVisibleRightVideo(true);
        }

    }

    const openLink_downloadFile = async (node) => {
        trackCourse(node);
        let a = document.createElement('a');
        a.href = node.URL;
        a.target = "_blank";
        //a.download = 'example.json';
        a.click();
    }
    //#region Bài kiểm tra nhanh
    const [visibleCheckList, setVisibleCheckList] = useState(false);
    const [paramCheckList, setParamCheckList] = useState([]);
    function openCheckList(node) {
        setVisibleCheckList(true);
        setParamCheckList(node);
    }
    function closeCheckList() {
        setVisibleCheckList(false);

        loadApi();
    }
    //#endregion

    function openNormalAssessment(node) {
        setVisibleFullScreen(true);
        setStudentLauchID(node.UserID);
    };
    const clickShare = async () => {
        setshowShare(true);
        let lstTree1 = await overViewService.getsharetreejson();
        let result = await overViewService.getfilecontroldetails();
        let result1 = await overViewService.getfileimgcontroldetails();
        var arrTree = JSON.parse(lstTree1.data.TreeJson);
        printList1(arrTree[0])
        printList(arrTree[0])
        setlstTree(arrTree);
        setdataFile(result.data);
        setdataImg(result1.data)
    }

    function printList(singleLinkedList) {
        let p = singleLinkedList;

        while (p) {
            p.children = p.childs;
            p.key = p.id;
            for (let k = 0; k < p.childs.length; k++) {
                p = p.childs[k];
                p.key = p.id;
                p.children = p.childs;
                for (let j = 0; j < p.children.length; j++) {
                    p.children[j].key = p.children[j].id;
                    p.children[j].children = p.children[j].childs;
                    if (p.children[j].childs == null) {
                        return ""
                    }
                }
                if (p.childs == null) {
                    return ""
                }
            }
        }
    }
    function printList1(singleLinkedList) {
        let p = singleLinkedList;

        while (p) {
            for (let k = 0; k < p.childs.length; k++) {
                if (p.label.indexOf('<b>') >= 0) {
                    let del_str = p.label.replace('<b>', '');
                    p.label = del_str;
                }
                if (p.label.indexOf('</b>') >= 0) {
                    let del_str = p.label.replace('</b>', '');
                    p.label = del_str;
                }
                p = p.childs[k];
                if (p.childs == null) {
                    return ""
                }
            }
        }
    }
    // function checkVisibleAddTopicBtn() {
    //     debugger
    //     if (dataLopHocTT.Id && dataLopHocTT.NominationStatus == null) {
    //         setVisibleAddTopic(false);
    //     }
    //     if (dataCourse.CourseID && dataCourse.LearningFlag == "") {
    //         setVisibleAddTopic(false);
    //     }
    // }

    const [dataProgramFilter, setDataProgramFilter] = useState([]);
    const [parentIDFilter, setParentIDFilter] = useState(0);
    let currentData = [...dataNodeOrg];

    function keyDown(e) { //sử dụng hàm onKeySearchChange nên k cần nữa
        if (e.key == 'Enter') {
            if (e.target.value.trim() == "") {
                setDataProgramFilter(dataNodeOrg);
                //currentData = [...dataNodeOrg]; 
            } else {
                const searchValue = e.target.value.trim().toLowerCase();
                const filteredData = dataNodeOrg.filter(item =>
                    item.NodeID == searchValue || item.NodeName.toLowerCase().includes(searchValue)
                );
                currentData = filteredData;
                setDataProgramFilter(currentData);
            }
        }
    }

    const [timer, setTimer] = useState(null)
    const onKeySearchChange = e => {
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            if (e.target.value.trim() == "") {
                setDataProgramFilter(dataNodeOrg);
                //currentData = [...dataNodeOrg]; 
            } else {
                const searchValue = e.target.value.trim().toLowerCase();
                const filteredData = dataNodeOrg.filter(item =>
                    item.NodeID == searchValue || item.NodeName.toLowerCase().includes(searchValue)
                );
                currentData = filteredData;
                setDataProgramFilter(currentData);
            }
        }, 500)
        setTimer(newTimer)
    }


    return (
        <div className='body-scroll-learner-deatil'>
            <LoadingPanel loading={loading}>
                <Toast ref={toastBR} position="bottom-right" />
                <div className={classNames('p-2')} style={{ width: '100%', height: 'auto', maxHeight: 'fit-content', background: '#efefef', borderBottom: '1px solid #ccc' }}>
                    {typeLearner == 'B' ? <Link class="fa fa-close" style={{ float: right }} to={'/learner/my-learning'}></Link> :
                        (typeLearner == 'H' ? <Link class="fa fa-close" style={{ float: right }} to={'/learner/training-history'}></Link> : <Link class="fa fa-close" style={{ float: right }} to={'/learner/catalogue'}></Link>)
                    }

                    <div className={`${styles.hearder_detail} d-flex flex-row justify-content-left p-2`}>
                        <div className={styles.img_detail} style={{ backgroundColor: '#1AA1DC', maxHeight: '160px', borderRadius: '12px' }} >
                            {/* <Image src={linkImage} style={{ maxHeight: '120px' }}></Image> */}
                            {/* copy html ảnh sang urlDecode rồi paste vào các trường hợp ở dưới nếu có lỗi */}
                            {/* <Image style={{ width: "100%", borderRadius: "10px", objectFit: "cover", height: '-webkit-fill-available', border: '1px solid #ccc' }}
                                src=
                                {(decodeURIComponent(linkImage) == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=78&ImageFile=../Content/Specific/Images/ILT.jpg'
                                    || decodeURIComponent(linkImage) == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=150&ImageFile=../Content/Specific/Images/Elearning.jpg'
                                    || decodeURIComponent(linkImage) == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=150&ImageFile=../Content/Specific/Images/ebook.jpg'
                                    || linkImage == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=78&ImageFile=../Content/Specific/Images/ILT.jpg'
                                    || linkImage == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=150&ImageFile=../Content/Specific/Images/Elearning.jpg'
                                    || linkImage == appSetting.ADMIN_URL + '/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=125&ImageHeight=150&ImageFile=../Content/Specific/Images/ebook.jpg')
                                    ? appSetting.ADDRESS_WEB + '/images/course-icon.png' : (linkImage) || appSetting.ADDRESS_WEB + '/images/course-icon.png'}
                            /> */}

                            <Image className={`${styles.imgMobile}`} src={linkImage} style={{ width: "100%", borderRadius: "10px", objectFit: "cover", height: '-webkit-fill-available', border: '1px solid #ccc' }}></Image>
                            <div className={`${styles.textMobile} flex-none`}>
                                <div className='d-flex flex-row justify-content-end align-items-center'>
                                    {/* <div>
                                           
                                            {props.nameCourseType != 'T' &&
                                                <i title='Chia sẻ' onClick={() => clickShare()} className='fas fa-share-alt mr-3' style={{ fontSize: "20px", cursor: "pointer", color: 'rgb(122 122 122)' }}></i>
                                            }
                                          
                                        </div> */}
                                    {nameCourseType != "T" ?
                                        <>
                                            <div>
                                                {dataCourse.CourseTypeName ?
                                                    <a className='btn btn-secondary btn-custom mr-1 ml-1' style={{ cursor: 'default' }}>{dataCourse.CourseTypeName}</a> : ''
                                                }
                                            </div>
                                            <div>
                                                {dataCourse.LearningFlag ?
                                                    <button className='btn btn-secondary btn-custom mr-1 ml-1' style={{ cursor: 'default' }}>{dataCourse.LearningFlag}</button> : ''
                                                }
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div>
                                                <button className='btn btn-secondary btn-custom mr-1' style={{ cursor: 'default' }}>Lớp học tập trung</button>
                                            </div>

                                            {dataLopHocTT.NominationStatus ?
                                                <div>
                                                    <button className='btn btn-secondary btn-custom  ml-1' style={{ cursor: 'default' }}>{dataLopHocTT.LearningFlag}</button>
                                                </div>
                                                :
                                                ''
                                            }


                                        </>
                                    }
                                </div>
                                {nameCourseType != "T" ?
                                    <>
                                        {dataCourse.LearningFlag == "" && isMyLearningAPI == false ?
                                            <div className="mt-4">
                                                <Button style={{ display: 'initial', fontSize: '22px', fontWeight: 'bold' }} className='p-button p-component w-100 p-4' onClick={() => accessLearning(dataCourse)}>Đăng ký học</Button>
                                            </div>
                                            : ''
                                        }
                                    </> :
                                    <>
                                        {dataLopHocTT.NominationStatus == null ?
                                            <div className="mt-4">
                                                <Button style={{ display: 'initial', fontSize: '22px', fontWeight: 'bold' }} className='p-button p-component w-100 p-4' onClick={() => accessLearningLHTT(dataLopHocTT)}>Đề xuất</Button>
                                            </div>
                                            :
                                            ''
                                        }
                                    </>
                                }


                            </div>
                        </div>
                        <div className='p-2 w-100'>
                            <div className='d-flex flex-row mr-2'>
                                <div className='flex-1 pr-2'>
                                    <span className="title-text fw-bold ">
                                        {nameCourseType == "T" ?
                                            <React.Fragment>
                                                <p className={styles.courseName} >{dataLopHocTT.Name}</p>
                                                {/* <p className={styles.courseCode} >{''}</p> */}
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <p className={styles.courseName} >{dataCourse.CourseName}</p>
                                                {/* <p className={styles.courseCode} style={{ fontSize: '0.9rem' }} >{dataCourse.CourseCode ? 'Mã KH: ' + dataCourse.CourseCode : ''}</p> */}
                                            </React.Fragment>
                                        }
                                    </span>
                                    {nameCourseType != "T" ?
                                        <div>
                                            {dataCourse.CourseDescription ?
                                                <div className={styles.courseDesc}>
                                                    {dataCourse.CourseDescription.length > 180 ?
                                                        <>
                                                            {showMoreDescription ?
                                                                <>
                                                                    <span className='text-justify' dangerouslySetInnerHTML={{ __html: dataCourse.CourseDescription }}></span>
                                                                    <span>
                                                                        <a className={styles.btnShowMore} size="sm" onClick={() => setshowMoreDescription(!showMoreDescription)}>
                                                                            {showMoreDescription ? "Thu gọn" : "Mở rộng"}
                                                                        </a>
                                                                    </span>
                                                                </> :
                                                                <>
                                                                    <span className='text-justify' dangerouslySetInnerHTML={{ __html: dataCourse.CourseDescription.substring(0, 180) + "..." }}></span>
                                                                    <span>
                                                                        <a className={styles.btnShowMore} size="sm" onClick={() => setshowMoreDescription(!showMoreDescription)}>
                                                                            {showMoreDescription ? "Thu gọn" : "Mở rộng"}
                                                                        </a>
                                                                    </span>
                                                                </>
                                                            }
                                                        </> :
                                                        <>
                                                            <span className='text-justify' dangerouslySetInnerHTML={{ __html: dataCourse.CourseDescription }}></span>
                                                        </>
                                                    }
                                                    {/* <Link to={{ pathname: '/learner/calender' }}> Xem thêm <i className="fa fa-solid fa-angles-right" aria-hidden="true" style={{ fontSize: "11px" }}></i></Link> */}
                                                </div>
                                                :
                                                <p className='text-justify pr-3'>Không có mô tả khóa học/bài thi</p>
                                            }
                                        </div>
                                        :
                                        <div>
                                            {
                                                dataLopHocTT.Description ?
                                                    <p className='text-justify pr-3' dangerouslySetInnerHTML={{ __html: dataLopHocTT.Description }}></p> :
                                                    <p className='text-justify pr-3'>Không có mô tả lớp học tập trung</p>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={`${styles.textMobile1} flex-none`}>
                                    <div className='d-flex flex-row justify-content-end align-items-center'>
                                        {/* <div>
                                           
                                            {props.nameCourseType != 'T' &&
                                                <i title='Chia sẻ' onClick={() => clickShare()} className='fas fa-share-alt mr-3' style={{ fontSize: "20px", cursor: "pointer", color: 'rgb(122 122 122)' }}></i>
                                            }
                                          
                                        </div> */}
                                        {nameCourseType != "T" ?
                                            <>
                                                <div>
                                                    {dataCourse.CourseTypeName ?
                                                        <a className='btn btn-secondary btn-custom mr-1 ml-1' style={{ cursor: 'default' }}>{dataCourse.CourseTypeName}</a> : ''
                                                    }
                                                </div>
                                                <div>
                                                    {dataCourse.LearningFlag ?
                                                        <button className='btn btn-secondary btn-custom mr-1 ml-1' style={{ cursor: 'default' }}>{dataCourse.LearningFlag}</button> : ''
                                                    }
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div>
                                                    <button className='btn btn-secondary btn-custom mr-1' style={{ cursor: 'default' }}>Lớp học tập trung</button>
                                                </div>

                                                {dataLopHocTT.NominationStatus ?
                                                    <div>
                                                        <button className='btn btn-secondary btn-custom  ml-1' style={{ cursor: 'default' }}>{dataLopHocTT.LearningFlag}</button>
                                                    </div>
                                                    :
                                                    ''
                                                }


                                            </>
                                        }
                                    </div>
                                    {nameCourseType != "T" ?
                                        <>
                                            {dataCourse.LearningFlag == "" && isMyLearningAPI == false ?
                                                <div className="mt-4">
                                                    <Button style={{ display: 'initial', fontSize: '22px', fontWeight: 'bold' }} className='p-button p-component w-100 p-4' onClick={() => accessLearning(dataCourse)}>Đăng ký học</Button>
                                                </div>
                                                : ''
                                            }
                                        </> :
                                        <>
                                            {dataLopHocTT.NominationStatus == null ?
                                                <div className="mt-4">
                                                    <Button style={{ display: 'initial', fontSize: '22px', fontWeight: 'bold' }} className='p-button p-component w-100 p-4' onClick={() => accessLearningLHTT(dataLopHocTT)}>Đề xuất</Button>
                                                </div>
                                                :
                                                ''
                                            }
                                        </>
                                    }


                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column flex-3'>
                    <div className="card" style={{ borderBottom: 'none' }}>
                        <div className='w-100 custom-detail-learning' style={{ position: "relative", marginTop: '-13px' }}>
                            {/* <hr className='hr-detail-learning'/> */}


                            <TabView style={{ top: '-13px', width: setWithTabView(), margin: '0 auto', overflow: 'auto', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '6px' }} activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                                <TabPanel header="Tổng quan ">
                                    {nameCourseType == "T" ?
                                        <div>
                                            <div className='top-start d-flex flex-row border-bottom mb-3'>
                                                <div className='col-12'>
                                                    <div className="d-flex flex-row justify-content-between icon-learning p-2">
                                                        <div>
                                                            <p>
                                                                <span className="date-head"><i className="fas fa-calendar-days"></i> Ngày bắt đầu: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataLopHocTT.StartDate}</span>
                                                            </p>
                                                            <p>
                                                                <span className="date-head"><i className="fas fa-clock-rotate-left"></i> Ngày kết thúc: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataLopHocTT.EndDate}</span>
                                                            </p>
                                                            <p>
                                                                <span className={styles.onHeading}> <i className="fas fa-map"></i> Chủ đề </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataLopHocTT.Topic}</span>
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p>
                                                                <span className={styles.onHeading}><i className="fas fa-clipboard"></i> Giờ tín chỉ </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataLopHocTT.CreditHoursAchieved}/{dataLopHocTT.CreditHrs}</span>
                                                            </p>
                                                            <p>
                                                                <span className={styles.onHeading}><i className="fas fa-user"></i> Người quản lý tạo </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataLopHocTT.AdminName}</span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                <span className={styles.onHeading}><i className="fas fa-flag cursor-pointer"></i> Trạng thái đề xuất hiện tại: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataLopHocTT.NominationStatusText}</span>
                                                            </p>
                                                            {dataLopHocTT.EventSize ?

                                                                <p>
                                                                    <span className={styles.onHeading}><i className="fa fa-users" aria-hidden="true"></i> Số lượng học viên </span>
                                                                    <span className="date-head" style={{ fontWeight: '600' }}>{dataLopHocTT.EventSize}</span>
                                                                </p>
                                                                : '<p></p>'
                                                            }
                                                        </div>
                                                        {
                                                            dataLopHocTT.WithdrawBtnVisible == true ?
                                                                <div className='d-flex align-items-center justify-content-end' style={{}}>
                                                                    <Button className='p-2' onClick={() => setBtnKhongThamGia(true)}>Không tham gia</Button>
                                                                    <Dialog header="Bạn có chắc chắn muốn rút khỏi lớp học này không? Nêu lý do *" visible={btnKhongThamGia} onHide={() => setBtnKhongThamGia(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} >
                                                                        <form className="row g-3" onSubmit={handleSubmit(onSubmitKTG)}>
                                                                            <div className="mb-3 field">
                                                                                <span className="p-float-label">
                                                                                    <Controller name="reasonKhongThamGia" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                                                                        <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                                                                                    )} />
                                                                                </span>
                                                                                {getFormErrorMessage('reasonKhongThamGia', errors)}
                                                                            </div>
                                                                            <div className="col-12 d-flex justify-content-end">
                                                                                {/* <button className="btn btn-primary mr-3" type="submit" onClick={() => ReAttemptRequest(item, getValues('reason'))} >Gửi</button> */}
                                                                                <Button className="btn btn-primary mr-3" label="Đồng ý" autoFocus type="submit" onClick={() => sentReasonKhongThamGia(dataLopHocTT, getValues('reasonKhongThamGia'))} />
                                                                                <Button label="Hủy bỏ" onClick={() => setBtnKhongThamGia(false)} className="p-button-text" />
                                                                            </div>
                                                                        </form>
                                                                    </Dialog>
                                                                </div>
                                                                : ''
                                                        }
                                                        {
                                                            dataLopHocTT.MrkPrsntBySlfButtonVisible == true ?
                                                                <div className='d-flex align-items-center justify-content-center' style={{}}>
                                                                    <Button onClick={() => confirmDiemDanh(dataLopHocTT.Id, getMinSeessionId(dataLopHocTT.Sessions))}>Điểm danh</Button>
                                                                </div>
                                                                : ''
                                                        }
                                                        {
                                                            dataLopHocTT.FeedbackButtonVisible == true && dataLopHocTT.IsILTLevelFeedback == true && dataLopHocTT.ILTStatus == "X" ?
                                                                <div className='d-flex align-items-center justify-content-center' style={{ minWidth: '105px' }}>
                                                                    {dataLopHocTT.IsFeedbackFormFilled == false ?
                                                                        <Button onClick={() => openFeedBack(dataLopHocTT.Id)}>Phản hồi</Button>
                                                                        :
                                                                        <Button onClick={() => openDetailFeedBack(dataLopHocTT.Id, dataLopHocTT)}>Phản hồi</Button>}
                                                                </div>
                                                                : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div >
                                                <div className='p-3 list-item'>
                                                    <span>
                                                        {expand == true ?
                                                            <a onClick={() => setExpand(false)} style={{ color: '#3d4758', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-square" viewBox="0 0 16 16">
                                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                                </svg>
                                                                {/* <i onClick={() => setExpand(false)} className="fas fa-light fa-square-minus mr-1" style={{ fontSize: '22px', cursor: 'pointer' }}></i> */}
                                                                &nbsp;{dataLopHocTT.Name}
                                                            </a>
                                                            :
                                                            <a onClick={() => setExpand(true)} style={{ color: '#3d4758', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                                                                <i className="bi bi-plus-square"></i>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                                </svg>
                                                                {/* <i onClick={() => setExpand(true)} className="bi bi-plus-square mr-1" style={{ fontSize: '22px', cursor: 'pointer' }}></i> */}
                                                                &nbsp;{dataLopHocTT.Name}
                                                            </a>
                                                        }


                                                    </span>
                                                    {expand == true ?
                                                        <table className={screenWidth <= 767 ? '' : 'table pl-1'}>
                                                            <tbody className={styles.tbodyBorder}>
                                                                {dataLopHocTT.Sessions.map((item, index) => (
                                                                    <tr key={index} className="shadow-2">
                                                                        <td>
                                                                            <div className='text-center d-flex flex-column'>
                                                                                <span className={styles.nodeName}>{item.Name}</span>
                                                                                <div className='d-flex flex-row flex-3'>
                                                                                    <span className={styles.nodeDescription} dangerouslySetInnerHTML={{ __html: item.Description }}></span>



                                                                                </div>

                                                                            </div>
                                                                        </td>


                                                                        <td>
                                                                            <div className='text-center d-flex flex-column'>
                                                                                <span className={styles.onHeading}>Thời gian bắt đầu</span>
                                                                                <span className="" style={{ fontWeight: '600' }}>{item.StartTime}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className='text-center d-flex flex-column'>
                                                                                <span className={styles.onHeading}>Thời gian kết  thúc</span>
                                                                                <span className="" style={{ fontWeight: '600' }}>{item.EndTime}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className='text-center d-flex flex-column'>
                                                                                <span className={styles.onHeading}>Địa điểm</span>
                                                                                <span className="" style={{ fontWeight: '600' }}>{item.Venue}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className='text-center d-flex flex-column'>
                                                                                <span className={styles.onHeading}>Giảng viên</span>
                                                                                {(dataLopHocTT.NominationStatus == null && dataLopHocTT.NominationStatusText == null) ?
                                                                                    <>
                                                                                        <span className="cursor-pointer" style={{ fontWeight: '600', textDecoration: 'underline', maxWidth: '28rem' }} onClick={(e) => op2.current.toggle(e)}>
                                                                                            {splitInstructor(item.InstructorName)}
                                                                                        </span>
                                                                                    </>
                                                                                    :
                                                                                    <span className="" style={{ fontWeight: '600', maxWidth: '28rem' }}>{item.InstructorName}</span>
                                                                                }

                                                                            </div>
                                                                            <OverlayPanel ref={op2} showCloseIcon>
                                                                                <div className={styles.overlayPanel} style={{ height: 'auto', display: 'block', width: 'auto' }}>
                                                                                    <div className={styles.overlayPanelTop}>
                                                                                        Thông tin giảng viên
                                                                                    </div>
                                                                                    <div className={styles.overlayPanelBottom}>
                                                                                        <table className={styles.overlayTable}>
                                                                                            <tbody className={styles.overlayTableContent}>
                                                                                                <tr>
                                                                                                    <td className='d-flex align-items-start'>Tên giảng viên</td>
                                                                                                    <td style={{ maxWidth: '17rem' }}>: {instructorInfo.fullName}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td className='d-flex align-items-start'>Loại hình giảng dạy</td>
                                                                                                    <td style={{ maxWidth: '17rem' }}>: {instructorInfo.type}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td className='d-flex align-items-start'>Kiểu giảng viên</td>
                                                                                                    <td style={{ maxWidth: '17rem' }}>: {instructorInfo.isInternal == true ? "Nội bộ" : "Ngoài hệ thống"}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td className='d-flex align-items-start'>Tiểu sử giảng viên</td>
                                                                                                    <td style={{ maxWidth: '17rem' }}>: {instructorInfo.instratorBIO}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td className='d-flex align-items-start'>Số lần đào tạo được gán</td>
                                                                                                    <td style={{ maxWidth: '17rem' }}>: {instructorInfo.countAssign}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td colSpan={2}><div style={{ float: 'right', marginRight: '10px' }}>
                                                                                                        <Image src='https://cdn-icons-png.flaticon.com/512/194/194936.png' style={{ width: '80px', height: '85px', marginTop: '-250px' }} />
                                                                                                    </div></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                            </OverlayPanel>
                                                                        </td>

                                                                        {item.MrkPrsntBySlfButtonVisible == true ?
                                                                            <td style={{ verticalAlign: 'middle' }}>
                                                                                <a className='text-center d-flex flex-column align-items-center'>
                                                                                    <Button onClick={() => confirmDiemDanh(dataLopHocTT.Id, item.Id)}>Điểm danh</Button>
                                                                                </a>
                                                                            </td> : ''
                                                                        }
                                                                        {item.SessioFeedbackButtonVisible == true && dataLopHocTT.ILTStatus == "X" && dataLopHocTT.FeedbackButtonVisible == true ?
                                                                            <td style={{ verticalAlign: 'middle', minWidth: '105px' }}>
                                                                                <a className='text-center d-flex flex-column align-items-center'>
                                                                                    {(dataLopHocTT.FilledSessions ? dataLopHocTT.FilledSessions : "").indexOf(item.Id) < 0 ?
                                                                                        <Button onClick={() => openFeedBack(item.Id)}>Phản hồi</Button>
                                                                                        :
                                                                                        <Button onClick={() => openDetailFeedBack(item.Id, dataLopHocTT)}>Phản hồi</Button>}
                                                                                </a>
                                                                            </td> : ''
                                                                        }
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        :
                                                        ''}
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className='row mb-3' style={{ height: '115px' }}>
                                                <div style={{ height: '100%' }} className=
                                                    {dataCourse.Status == "Đã hoàn thành" && dataCourse.CerficateImagePath ?
                                                        'col-md-10' : 'col-md-12'
                                                    }
                                                >
                                                    <div className="top-start d-flex flex-row justify-content-between icon-learning p-4" style={{ paddingBottom: '0px !important' }}>
                                                        <div className=''>
                                                            <p>
                                                                <span className="date-head"><i className="fas fa-calendar-days"></i> Ngày bắt đầu: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataCourse.StartDate}</span>
                                                            </p>
                                                            <p>
                                                                <span className="date-head"><i className="fas fa-clock-rotate-left"></i> Ngày kết thúc: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataCourse.EndDate}</span>
                                                            </p>
                                                            <p>
                                                                <span className="date-head"><i className="fas fa-search"></i> Từ khóa: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{KeySearch(dataCourse.KeyWord)}</span>
                                                            </p>
                                                        </div>
                                                        <div className=''>
                                                            <p>
                                                                <span className="date-head"><i className="pi pi-eye"></i>Lượt xem:&nbsp;</span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataCourse.ViewCount}</span>
                                                                {/* <span className="date-head"><i className="fas fa-clipboard"></i> Giờ tín chỉ: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataCourse.CreditHoursAchieved}/{dataCourse.CreditHours}</span> */}
                                                            </p>


                                                        </div>
                                                        <div className=''>
                                                            <p>
                                                                <span className="date-head"><i className="fas fa-flag"></i> Trạng thái: </span>
                                                                <span className="date-head" style={{ fontWeight: '600' }}>{dataCourse.Status}</span>
                                                            </p>
                                                            <p>
                                                                <div style={{ position: 'relative' }}>
                                                                    <ProgressBar className={styles.progressBar} value={dataCourse.Progress}></ProgressBar>
                                                                </div>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                                {dataCourse.Status == "Đã hoàn thành" && dataCourse.CerficateImagePath &&
                                                    <>
                                                        <div className='col-md-2' >
                                                            <div className='top-start d-flex flex-column icon-learning pt-2' style={{ height: '100%' }}>
                                                                <p className="date-head d-flex justify-content-center">
                                                                    <i className="fas fa-address-card" aria-hidden="true"></i> Chứng chỉ
                                                                </p>
                                                                <p className='d-flex justify-content-center'>
                                                                    <Image src={dataCourse.CerficateImagePath} style={{ maxHeight: '5rem', maxWidth: '6.5rem', cursor: 'pointer', width: '100%' }} onClick={() => openInNewTab(dataCourse.CerficateImagePath)} />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>

                                            {viewTypeProgram == true ?
                                                <div className='d-flex flex-row' style={{ marginTop: '44px' }}>
                                                    <div className='col-3 list-folder-left' >

                                                        {/* courseName trái*/}
                                                        <a onClick={() => setParentIDFilter(0)} style={{ color: '#3d4758', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }} title={dataCourse.CourseName}>
                                                            <i class="pi pi-folder-open" style={{ fontSize: '18px' }} ></i>
                                                            &nbsp;{dataCourse.CourseName.length > 50 ? dataCourse.CourseName.substring(0, 50) + "..." : dataCourse.CourseName}
                                                        </a>
                                                        {/* folder trái*/}
                                                        <table className="table pl-1">
                                                            <tbody className={styles.tbodyBorder}>
                                                                {dataNodeTree.map((item, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {item.NodeTypeId == 0 && item.ParentNodeID == 0 && item.children.length > 0 ?
                                                                            <>
                                                                                {parentIDFilter == item.NodeID ?
                                                                                    <a onClick={() => { setParentIDFilter(item.NodeID) }} style={{ color: '#3d4758', fontWeight: '', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block', backgroundColor: '#7DD3F9' }} title={item.NodeName}>
                                                                                        <i class="pi pi-folder-open" style={{ fontSize: '16px' }} ></i>
                                                                                        &nbsp;{item.NodeName.length > 50 ? item.NodeName.substring(0, 50) + "..." : item.NodeName}
                                                                                    </a>
                                                                                    :
                                                                                    <a onClick={() => { setParentIDFilter(item.NodeID) }} style={{ color: '#3d4758', fontWeight: '', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block' }} title={item.NodeName}>
                                                                                        <i class="pi pi-folder-open" style={{ fontSize: '16px' }} ></i>
                                                                                        &nbsp;{item.NodeName.length > 50 ? item.NodeName.substring(0, 50) + "..." : item.NodeName}
                                                                                    </a>
                                                                                }
                                                                            </>
                                                                            :
                                                                            <div style={{ paddingLeft: '6px' }}>
                                                                                {item.NodeTypeId != 0 && item.children.length == 0 ?
                                                                                    <>
                                                                                        {parentIDFilter == item.NodeID ?
                                                                                            <a onClick={() => { setParentIDFilter(item.NodeID) }} style={{ color: '#3d4758', fontWeight: '', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block', backgroundColor: '#7DD3F9' }} title={item.NodeName}>
                                                                                                <i class="pi pi-book" style={{ fontSize: '16px', paddingRight: '8px' }} ></i>
                                                                                                &nbsp;{item.NodeName.length > 50 ? item.NodeName.substring(0, 50) + "..." : item.NodeName}
                                                                                            </a>
                                                                                            :
                                                                                            <a onClick={() => { setParentIDFilter(item.NodeID) }} style={{ color: '#3d4758', fontWeight: '', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block' }} title={item.NodeName}>
                                                                                                <i class="pi pi-book" style={{ fontSize: '16px', paddingRight: '8px' }} ></i>
                                                                                                &nbsp;{item.NodeName.length > 50 ? item.NodeName.substring(0, 50) + "..." : item.NodeName}
                                                                                            </a>
                                                                                        }
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        {item.NodeTypeId == 0 && item.children.length == 0 && //Folder rỗng
                                                                                            <>
                                                                                                {parentIDFilter == item.NodeID ?
                                                                                                    <a onClick={() => { setParentIDFilter(item.NodeID) }} style={{ color: '#3d4758', fontWeight: '', fontSize: '14px', cursor: 'pointer', paddingLeft: '5px', display: 'block', backgroundColor: '#7DD3F9', paddingBottom: '3px' }} title={item.NodeName}>
                                                                                                        <i class="pi pi-folder-open" style={{ fontSize: '16px', paddingRight: '7px' }} ></i>
                                                                                                        &nbsp;{item.NodeName.length > 50 ? item.NodeName.substring(0, 50) + "..." : item.NodeName}
                                                                                                    </a>
                                                                                                    :
                                                                                                    <a onClick={() => { setParentIDFilter(item.NodeID) }} style={{ color: '#3d4758', fontWeight: '', fontSize: '14px', cursor: 'pointer', paddingLeft: '5px', display: 'block', paddingBottom: '3px' }} title={item.NodeName}>
                                                                                                        <i class="pi pi-folder-open" style={{ fontSize: '16px', paddingRight: '7px' }} ></i>
                                                                                                        &nbsp;{item.NodeName.length > 50 ? item.NodeName.substring(0, 50) + "..." : item.NodeName}
                                                                                                    </a>
                                                                                                }

                                                                                            </>
                                                                                        }
                                                                                    </>
                                                                                }

                                                                            </div>
                                                                        }
                                                                    </React.Fragment>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className='col-9 list-item list-node-right'>
                                                        <div >
                                                            <span className='d-flex justify-content-end' style={{ marginTop: '10px' }} >
                                                                <p className='d-flex flex-row justify-content-end' style={{ marginRight: '10px' }}>
                                                                    <span className="p-inputgroup">
                                                                        {
                                                                            visible == true ?
                                                                                <div className='p-input-icon-right'>
                                                                                    <i className="pi pi-times" onClick={() => { setvisible(false), setDataProgramFilter(dataNodeOrg) }} />
                                                                                    <InputText autoFocus onChange={(e) => onKeySearchChange(e)} visible={visible} onHide={() => setvisible(false)} placeholder="Tìm kiếm nội dung theo Tên/Mã" style={{ width: '400px' }} />
                                                                                </div>
                                                                                :
                                                                                ''
                                                                        }
                                                                        {
                                                                            visible == false &&
                                                                            <>
                                                                                {dataCourse.LearningFlag != "" &&
                                                                                    <i className="pi pi-home" style={{ fontSize: '20px', marginRight: '5px', cursor: 'pointer' }} onClick={() => setViewTypeProgram(!viewTypeProgram)} />
                                                                                }
                                                                                <i className="ml-2 fa-sharp fa-solid fa-magnifying-glass align-self-center" type='button' style={{ fontSize: '16px' }} onClick={() => setvisible(true)}></i>

                                                                            </>

                                                                        }
                                                                    </span>
                                                                </p>
                                                            </span>
                                                        </div>

                                                        {/* Các node trong folder phải*/}
                                                        <table className="table " style={{ marginTop: '-10px' }}>
                                                            <tbody className={styles.tbodyBorder} style={{}}>

                                                                {console.log('tree1', dataProgramFilter)}
                                                                {console.log('parentIDFilter', parentIDFilter)}

                                                                {dataProgramFilter.map((item, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {item.NodeTypeId != 0 && item.ParentNodeID != 0 ?
                                                                            <>
                                                                                {
                                                                                    parentIDFilter > 0 ?
                                                                                        <>
                                                                                            {item.ParentNodeID == parentIDFilter &&
                                                                                                <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={item} idCourse={idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />
                                                                                            }
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={item} idCourse={idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />
                                                                                        </>
                                                                                }
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {/*nếu là folder rỗng không có chilren sẽ k hiện VD: Program VA2704-pub -> nhóm 2*/}
                                                                                {/*nếu chỉ có 1 cấp folder to */}
                                                                                {/* {item.NodeTypeId != 0 &&
                                                                                    <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={item} idCourse={props.idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />

                                                                                } */}
                                                                                {
                                                                                    parentIDFilter > 0 ?
                                                                                        <>
                                                                                            {item.ParentNodeID == parentIDFilter ?
                                                                                                <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={item} idCourse={idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />
                                                                                                :
                                                                                                <>
                                                                                                    {item.NodeID == parentIDFilter && item.children.length == 0 && item.NodeTypeId == 0 ?
                                                                                                        <p><i>Chưa có nội dung</i></p>
                                                                                                        :
                                                                                                        <>
                                                                                                            {item.NodeID == parentIDFilter && item.children.length == 0 &&
                                                                                                                <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={item} idCourse={idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />
                                                                                                            }
                                                                                                        </>
                                                                                                    }
                                                                                                </>
                                                                                            }
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            {item.children.length == 0 && item.NodeTypeId != 0 &&
                                                                                                <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={item} idCourse={idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />

                                                                                            }
                                                                                        </>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </React.Fragment>
                                                                ))}
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                                :
                                                <div style={{ marginTop: '44px' }}>{/* chế độ xem bình thường */}
                                                    <div className='p-3 list-item'>
                                                        <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-10px' }}>
                                                            {viewTypeProgram == false ?
                                                                <span>
                                                                    {expand == true ?
                                                                        <a onClick={() => setExpand(false)} style={{ color: '#3d4758', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-square" viewBox="0 0 16 16">
                                                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                                            </svg>
                                                                            {/* <i onClick={() => setExpand(false)} className="fas fa-light fa-square-minus mr-1" style={{ fontSize: '22px', cursor: 'pointer' }}></i> */}
                                                                            &nbsp;{dataCourse.CourseName}
                                                                        </a>
                                                                        :
                                                                        <a onClick={() => setExpand(true)} style={{ color: '#3d4758', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                                            </svg>
                                                                            {/* <i onClick={() => setExpand(true)} className="fas fa-light fa-square-plus mr-1" style={{ fontSize: '22px', cursor: 'pointer' }}></i> */}
                                                                            &nbsp;{dataCourse.CourseName}
                                                                        </a>
                                                                    }
                                                                </span> :
                                                                <span></span>

                                                            }

                                                            {courseType == "P" && dataCourse.CourseTypeName == "Học trực tuyến" &&
                                                                <div className='d-flex justify-content-end' style={{ marginTop: '10px' }} >
                                                                    <p className='d-flex flex-row justify-content-end'>
                                                                        <span className="p-inputgroup">
                                                                            {/* {
                                                                                visible == true && viewTypeProgram == true ?
                                                                                    <div className='p-input-icon-right'>
                                                                                        <i className="pi pi-times" onClick={() => { setvisible(false), setDataProgramFilter(dataNodeTree) }} />
                                                                                        <InputText autoFocus onKeyDown={(e) => keyDown(e)} visible={visible} onHide={() => setvisible(false)} placeholder="Tìm kiếm nội dung theo Tên/Mã" style={{ width: '400px' }} />
                                                                                    </div>
                                                                                    :
                                                                                    ''
                                                                            } */}
                                                                            {
                                                                                visible == false &&
                                                                                <>
                                                                                    {dataCourse.LearningFlag != "" && dataNodeOrg.some(item => item.ParentNodeID > 0) &&
                                                                                        <i className="pi pi-sitemap" style={{ fontSize: '20px', marginRight: '5px', cursor: 'pointer' }} onClick={() => setViewTypeProgram(!viewTypeProgram)} />
                                                                                    }
                                                                                    {viewTypeProgram == true &&
                                                                                        <i className="ml-2 fa-sharp fa-solid fa-magnifying-glass align-self-center" type='button' style={{ fontSize: '16px' }} onClick={() => setvisible(true)}></i>
                                                                                    }

                                                                                </>

                                                                            }
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            }
                                                        </div>



                                                        {expand == true ?
                                                            <table className={screenWidth <= 767 ? '' : 'table pl-1'}>
                                                                <tbody className={styles.tbodyBorder}>
                                                                    {/* <tbody className={classNames('d-flex flex-column', styles.tbodyBorder)}> */}

                                                                    {dataNodeTree.map((item, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {item.NodeTypeId == 0 && item.ParentNodeID == 0 && item.children.length > 0 ?
                                                                                <>
                                                                                    {
                                                                                        item.isOpen == true ?
                                                                                            <>
                                                                                                <a onClick={() => isExpand(item.NodeID)} style={{ color: '#3d4758', fontWeight: '500', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block' }}>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-dash-square" style={{ padding: 'unset' }} viewBox="0 0 16 16">
                                                                                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                                                                    </svg>
                                                                                                    &nbsp;{item.NodeName}
                                                                                                </a>
                                                                                                {item.children.map((childItem, idx) => (
                                                                                                    <React.Fragment key={idx}>
                                                                                                        <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={childItem} idCourse={idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />
                                                                                                    </React.Fragment>
                                                                                                ))}
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                                <a onClick={() => isExpand(item.NodeID)} style={{ color: '#3d4758', fontWeight: '500', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block' }}>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" style={{ padding: 'unset' }}>
                                                                                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                                                                    </svg>
                                                                                                    &nbsp;{item.NodeName}
                                                                                                </a>
                                                                                            </>
                                                                                    }
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    {item.children.length == 0 && item.NodeTypeId != 0 ?  //node lẻ không nằm trong folder
                                                                                        <LearningDetailNodeItem isMyLearningAPINode={isMyLearningAPINode} dataNodeTree={item} idCourse={idCourse} courseCode={CourseCode} nodeName={nodeName} dataLopHocTT={dataLopHocTT} dataCourse={dataCourse} loadApiFromNodeItem={() => loadApi()} clickPlay={(node) => toExamDetail(node)} modeViewType={viewTypeProgram} courseType={courseType} />
                                                                                        :
                                                                                        <>
                                                                                            {item.children.length == 0 && item.NodeTypeId == 0 &&  //Folder rỗng
                                                                                                <>
                                                                                                    {
                                                                                                        item.isOpen == true ?
                                                                                                            <>
                                                                                                                <a onClick={() => isExpand(item.NodeID)} style={{ color: '#3d4758', fontWeight: '500', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block' }}>
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-dash-square" style={{ padding: 'unset' }} viewBox="0 0 16 16">
                                                                                                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                                                                                    </svg>
                                                                                                                    &nbsp;{item.NodeName}
                                                                                                                </a>
                                                                                                                <p><i style={{ paddingLeft: '30px' }}>Chưa có nội dung</i></p>
                                                                                                            </>
                                                                                                            :
                                                                                                            <>
                                                                                                                <a onClick={() => isExpand(item.NodeID)} style={{ color: '#3d4758', fontWeight: '500', fontSize: '14px', cursor: 'pointer', paddingLeft: '4px', display: 'block', paddingBottom: '8px' }}>
                                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" style={{ padding: 'unset' }}>
                                                                                                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                                                                                    </svg>
                                                                                                                    &nbsp;{item.NodeName}
                                                                                                                </a>
                                                                                                            </>
                                                                                                    }
                                                                                                </>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </React.Fragment>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                            :
                                                            ''}
                                                    </div>

                                                </div>
                                            }



                                        </div>
                                    }
                                </TabPanel>

                                <TabPanel header="Đánh giá xếp hạng ">
                                    <RatingContainer courseType={nameCourseType} courseLauchID={courseLauchID} isRated={isRated} iLTStatus={iLTStatus} />
                                    {/* <RatingContainer courseType={props.nameCourseType} courseLauchID={courseLauchID || props.courseLauchID} isRated={isRated || props.isRated} /> */}
                                </TabPanel>

                                <TabPanel header="Thảo luận ">
                                    {dataLopHocTT.IsAttachConversation == false || dataCourse.IsAttachConversation == false ?
                                        <i>Không có cuộc trò chuyện nào</i>
                                        :
                                        <ConversationContainer conversationID={ConversationID} isAttachConversation={IsAttachConversation} />
                                    }

                                </TabPanel>

                                {nameCourseType == "T" ?
                                    '' :
                                    <TabPanel header="Thông báo ">
                                        {dataAnnouncement.AnnouncementItems != '' ?
                                            <>
                                                <div className='list-information p-3 shadow-2'>
                                                    {dataAnnouncement.AnnouncementItems.map((itemTB, indexTB) => (
                                                        <>
                                                            <div key={indexTB} className='item-information d-flex flex-row p-3 mb-3'>
                                                                <div className='flex-none mr-2'>
                                                                    <ImageNotifyDef style={{ width: '90px', height: '80px', border: '5px solid #CCC' }} src={itemTB.Thumbnail} alt={itemTB.Title} />
                                                                </div>
                                                                <div className='flex-1 pr-3'>
                                                                    <div className={styles.atlrTopName}>
                                                                        <p className='font-weight-bold'>{itemTB.Title}</p>
                                                                    </div>
                                                                    {itemTB.DetailedDescription.length > 180 ?
                                                                        <>
                                                                            {showMoreDescNotify ?
                                                                                <div>
                                                                                    <span dangerouslySetInnerHTML={{ __html: itemTB.DetailedDescription }}></span>
                                                                                    &nbsp;
                                                                                    <span>
                                                                                        <a className={styles.btnShowMore} onClick={() => setshowMoreDescNotify(!showMoreDescNotify)}>
                                                                                            {showMoreDescNotify ? "Thu gọn" : "Mở rộng"}
                                                                                        </a>
                                                                                    </span>
                                                                                </div> :
                                                                                <div>
                                                                                    <span dangerouslySetInnerHTML={{ __html: itemTB.DetailedDescription.substring(0, 180) + "..." }}></span>
                                                                                    &nbsp;
                                                                                    <span>
                                                                                        <a className={styles.btnShowMore} onClick={() => setshowMoreDescNotify(!showMoreDescNotify)}>
                                                                                            {showMoreDescNotify ? "Thu gọn" : "Mở rộng"}
                                                                                        </a>
                                                                                    </span>
                                                                                </div>
                                                                            }
                                                                        </> :
                                                                        <>
                                                                            <div className={styles.announcementDescription}>
                                                                                <p dangerouslySetInnerHTML={{ __html: itemTB.DetailedDescription }}></p>
                                                                            </div>
                                                                        </>
                                                                    }


                                                                    {/* {ShowMoreString(itemTB.DetailedDescription, 180)} */}
                                                                    {itemTB.Attachment &&
                                                                        <div className={styles.dataImageSec} href="javascript:void(0);">
                                                                            <a target="_blank" href={itemTB.Attachment}>
                                                                                <span>{itemTB.AttachmentName}</span>
                                                                            </a>
                                                                        </div>
                                                                    }




                                                                </div>
                                                                <div className='flex-none'>
                                                                    <div className={styles.atlBottomList}>
                                                                        <p className='mb-1'>
                                                                            <span className={styles.head}>Người tạo </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                            <span className={styles.announcementSubhead}>{itemTB.CreatedBy}</span>
                                                                        </p>
                                                                        <p className='mb-1'>
                                                                            <span className={styles.head}>Khả dụng</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                            <span className={styles.announcementSubhead}>{itemTB.Availabilty}</span>
                                                                        </p>
                                                                        <p className='mb-1'>
                                                                            <span className={styles.head}>Ngày &amp; giờ</span>&nbsp;&nbsp;&nbsp;
                                                                            <span className={styles.announcementSubhead}>{itemTB.CreationDate}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </> :
                                            <p className='text-center'>Không có thông báo</p>
                                        }
                                    </TabPanel>
                                }
                            </TabView>
                        </div >
                    </div >
                    <Sidebar className='sidebar-header-none' visible={visibleFullScreen} fullScreen onHide={() => closeFullScreen()}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '0', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeFullScreen()} />
                                <OpenAssessmentContainer onClickOpenExam={(data) => {

                                    // setVisibleExam(true);
                                    const action = setvisibleDialog(true);
                                    dispatch(action);
                                    setVisibleFullScreen(false);
                                    setDataNode(data);
                                }} courseLaunchId={courseLauchID} nodeId={nodeLauchID} studentId={studentLauchID} courseCode={CourseCode} /></>
                        }
                    </Sidebar>
                    <Sidebar className='sidebar-header-none' visible={visibleCheckList} fullScreen onHide={() => closeCheckList()}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '0', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeCheckList()} />
                                <OpenCheckList onClickOpenExam={(data) => {

                                    // setVisibleExam(true);
                                    const action = setvisibleDialog(true);
                                    dispatch(action);
                                    setVisibleFullScreen(false);
                                    setDataNode(data);
                                }} parameter={paramCheckList} /></>
                        }
                    </Sidebar>
                    <Exam visibleExam={visibleDialog1} onCloseExam={() => closeFullScreen()} course_id={dataNode.NodeId} CourseLaunch_Id={dataNode.CourseLaunchId} type={dataNode.TypeProcess} courseCode={CourseCode}></Exam>
                    <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeRight()} position='right' style={{ width: '70%' }}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '10px', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeRight()} />
                                <FormHomeWorkContainer courseID={courseLauchID} courseName={courseName} nodeID={nodeLauchID} returnToPrevDisplay={() => closeRight()} />
                            </>
                        }
                    </Sidebar>
                    <Sidebar className='sidebar-header-none' visible={visibleRightFB} onHide={() => closeRightFB()} position='right' style={{ width: '70%' }}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '0', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeRightFB()} />
                                <FormFeedBackContainer iltID={idCourse} onShow={displayBasic} ILTName={dataLopHocTT.Name} sessionID={sessionId} formID={formId} onHiden={() => onHidenFormFeedback()} /></>

                        }
                    </Sidebar>

                    <Sidebar className='sidebar-header-none' visible={visibleDetail} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '0', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeRightDetail()} />
                                <FormDetailFeedBack iltID={idCourse} ILTName={dataLopHocTT.Name} sessionID={sessionId} dataDetail={dataDetail} formID={formId} /></>
                        }
                    </Sidebar>

                    <Sidebar className='sidebar-header-none' visible={visibleRightVideo} onHide={() => closeRightVideo()} position='right' style={{ width: '70%' }}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '10px', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeRightVideo()} />
                                <OpenVideoDisplay courseID={courseLauchID} nodeName={nodeName} nodeID={nodeLauchID} /></>
                        }
                    </Sidebar>
                    <ShareCourse dataTree={lstTree} dataFile={dataFile} dataImg={dataImg} visiblefull={showShare} onHide={() => setshowShare(false)}></ShareCourse>
                    <NotificationSubmitPassPoints onchange={() => setVisibleFullScreen(true)} NodeID={dataNode?.NodeId} AttemptsLeft={dataNode?.AttemptsLeft} openassessment={dataNode} CourseLaunch_Id={dataNode?.CourseLaunchId} ContentId={dataNode?.ContentId}></NotificationSubmitPassPoints>
                </div >
            </LoadingPanel >

        </div >

    )
}

LearningDeatilUrl.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    nameCourseType: PropTypes.string,
};

export default LearningDeatilUrl