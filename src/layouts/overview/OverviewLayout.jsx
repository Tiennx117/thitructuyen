
import 'styles/themes/offcanvas.scss';
import HeaderLMS from '../lms/HeaderLMS';
import { Avatar } from 'primereact/avatar';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import { Image } from 'components/Image';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import PostItem from '../overview/components/PostItem';
import { overViewService } from 'services/overViewService';
import React, { useEffect, useState, useRef } from 'react';
import TrainningCourse from './components/TrainningCourse';
import MissionTask from './components/MissionTask';
import Post from './components/Post';
import SearchPost from './components/SearchPost';
import SettingOverview from './components/SettingOverview';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { RiMore2Fill } from 'react-icons/ri'
import LearningDetailContainer from '../learner/components/LearningDetailContainer';
import { Sidebar } from 'primereact/sidebar';
import { useListState } from 'shared/hooks/useListState';
import { Toast } from 'primereact/toast';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { Dialog } from 'primereact/dialog';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { AiOutlineComment } from 'react-icons/ai';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi'
import { AiFillLike } from 'react-icons/ai'
// localStorage.removeItem('pathUrlActive');
const OverviewLayout = () => {
    const showPost = true;
    const [countlinetile, setcountlinetile] = useState(0);
    const [countMyTask, setcountMyTask] = useState(0);
    const [showLstPost, setshowLstPost] = useState(true);
    const [showmytask, setshowmytask] = useState(true);
    const toast = useRef(null);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [visibleFullScreen1, setVisibleFullScreen1] = useState(false);
    const [visibleFullScreen2, setVisibleFullScreen2] = useState(false);
    const [courseType, setCourseType] = useState("");
    const [courseId, setCourseId] = useState(0);
    const [visibleRight, setVisibleRight] = useState(false);
    const [dataUser, setdatadataUser] = useState([]);
    const [userID, setuserID] = useState([]);
    const [lstPost, setlstPost] = useState({});
    const [lstMyTask, setlstMyTask] = useState([]);
    const [filterBy1, setfilterBy1] = useState(0);
    const [lstTraining, setlstTraining] = useState(0);
    const [btnBaoCao, setbtnBaoCao] = useState(false);
    const [btnBaoCaoCMT, setbtnBaoCaoCMT] = useState(false);
    const [btnBaoCao1, setbtnBaoCao1] = useState(false);
    const [btnBaoCaoCMT1, setbtnBaoCaoCMT1] = useState(false);
    const [reasonBaoCao, setreasonBaoCao] = useState('');
    const [reason, setReason] = useState('');
    const [formData, setFormData] = useState({});
    const [formData1, setFormData1] = useState({});
    const [idTitle, setidTitle] = useState({});
    const [postshare, setpostshare] = useState({});
    const [lstUserBlock, setlstUserBlock] = useState([]);
    const [lstcmt, setlstcmt] = useState([]);
    const [page, setpage] = useState("");
    const [pagenum, setpagenum] = useState(1);
    const [countTaskList, setcountTaskList] = useState(0);
    const [search, setsearch] = useState({
        "CorporateID": 1,
        "WebAppFlag": "W",
        "assignedFilterBy": "",
        "pageNumber": 1,
        "pageSize": 10,
    });
    const [partimelinetiles, setpartimelinetiles] = useState({
        "CorporateID": 1,
        "WebAppFlag": "W",
        "assignedFilterBy": "",
        "pageNumber": 1,
        "pageSize": 5,
    });
    const [selectedItem, setselectedItem] = useState(null);
    const [selectedItemCMT, setselectedItemCMT] = useState(null);
    const [countItem, setcountItem] = useState(1);
    const [sobaidang, setsobaidang] = useState(0);
    const [shareTree, setshareTree] = useState([]);

    const defaultValuesLstUser = {
        DCorporateID: 1,
        SearchText: ""
    }

    function printList(singleLinkedList) {
        let p = singleLinkedList;
        if(!p.childs || p.childs.length <=0 ) return;
        p.key = p.id;
        p.children = p.childs;
        p.childs.forEach(child => {
            child.key = child.id;
            printList(child);
            
        });
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

    const loadApi = async (val, partimelinetiles) => {
        let result = await overViewService.getoverviewuserprofile();
        let result2 = await overViewService.getoverviewupcomingtraining();
        let result4 = await overViewService.getusertimelinetiles(partimelinetiles);
        let lstTree = await overViewService.getsharetreejson();
        let result3 = await overViewService.getoverviewmytask(search);
        let arrTree = JSON.parse(lstTree.data.TreeJson);

        setdatadataUser(result.data);
        setuserID(result.data.UserID);
        setlstPost(result4.data);
        setlstMyTask(result3.data);
        setlstTraining(result2.data);
        setcountTaskList(result3.data.MyTaskList.length);
        printList1(arrTree[0]);
        printList(arrTree[0]);
        setshareTree(arrTree);
        setcountMyTask(result3.data.MyTaskList.length);
        setcountlinetile(result4.data.TimeLineLists.length);

    }
    const { control, formState: { errors }, handleSubmit, reset, getValues } = useForm({ reason, reasonBaoCao });
    function onClickTitle(x) {
        setCourseId(x);
        if (x.CourseType == null) {
            x.CourseType = "T"
        }
        switch (x.CourseType) {
            case "T":
                setCourseId(x.ILTID);
                setCourseType(x.CourseType);
                break;
            default:
                setCourseId(x.ILTID);
                setCourseType(x.CourseType);
        }
        setVisibleRight(true);
    }
    function closeDetail() {
        setVisibleRight(false);
        loadApi(search, partimelinetiles);
    }
    function shareCall() {
        loadApi(search, partimelinetiles);
    }
    function createCall() {
        loadApi(search, partimelinetiles);
    }
    function settingCall() {
        loadApi(search, partimelinetiles);
    }
    // ẩn bài đăng
    const onRemoveItem = async (idShare, idTitle) => {
        var obj = {
            ShareId: idShare,
            TileId: idTitle
        }
        await overViewService.removetimelinetile(obj)
        // location.reload()
        loadApi(search, partimelinetiles);
    }
    function onClickCreatePost() {
        setVisibleFullScreen(true)
    }
    //chia sẻ bài đăng
    function onClickSearchPost(id) {
        setVisibleFullScreen1(true)
        setpostshare(id)
    }
    //xóa bài đăng
    const deleteItem = async (id) => {
        await overViewService.deletetimelinetile(id);
        loadApi(search, partimelinetiles);
    }
    const onDeleteItem = (id) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn xóa bài đăng?',
            accept: () => deleteItem(id)
        });
    }
    //setting
    const clickOnSetting = async () => {
        let result = await overViewService.blockeduserlist(defaultValuesLstUser);
        setlstUserBlock(result.data.lstUserDetails)
        setVisibleFullScreen2(true)

    }
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    //chặn bài đăng
    const blockItem = async (id) => {
        await overViewService.blockusertimelinetiles(id);
        loadApi(search, partimelinetiles);
    }
    const onBlockItem = (item) => {
        var obj = {
            Originator: item.Originator,
            SharedBy: item.SharedBy
        }
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn ẩn bài đăng của ' + item.OriginatorName,
            accept: () => blockItem(obj)
        });
    }
    //comment
    const onCommentItem = async (a, b) => {
        let obj = {
            TileId: b.TileId,
            Commentcount: 0,
            ConversationId: 0,
            CorporateId: 1,
            Flag: "I",
            Type: "",
            pageNumber: 0,
            recordsCount: 0
        }
        const targetObject = Object.assign(a, obj);
        await overViewService.insertupdatedeleteconversationcomments(targetObject);
        setpagenum(0)
        loadApi(search, partimelinetiles);
    }
    //like comment
    const likeCMT = async (item) => {
        debugger;
        let obj = {
            Commentcount: item.LikeCount,
            ConversationId: item.ConversationId,
            ConversationText: "",
            CorporateId: 1,
            Flag: "",
            TileId: item.TileId,
            Type: "",
            recordsCount: 5
        }
        await overViewService.likeupdateovertimelineconversation(obj);
        let result4 = await overViewService.getusertimelinetiles(partimelinetiles);
        setlstPost(result4.data);
    }

    //xem them cmt
    const xemThemComment = async (item) => {
        debugger;
        setLoading2(true);
        let obj = {
            ConversationId: item.TimeLineConversationList[0].ConversationId,
            Commentcount: 0,
            ConversationText: "",
            CorporateId: 1,
            Flag: "",
            TileId: item.TileId,
            Type: "",
            recordsCount: 5
        };
        setpage(item.TileId)
        if (page == item.TileId) {
            obj.pageNumber = pagenum + 1;
            setpagenum(pagenum + 1);
        } else {
            obj.pageNumber = 1;
            setpagenum(1)
        }
        let result = await overViewService.getusertimelineconversationlist(obj);
        setlstPost((data) => {
            let objItem = data.TimeLineLists.find(x => x.TileId === item.TileId);
            let indexObj = data.TimeLineLists.indexOf(objItem);
            let comments = data.TimeLineLists[indexObj].TimeLineConversationList;
            if (result.data.TimeLineConversationList != null) {
                comments = [...comments, ...result.data.TimeLineConversationList]
                data.TimeLineLists[indexObj].TimeLineConversationList = comments;
                return data;
            }
            else {
                alert('Không còn bình luận nào để hiển thị')
                data.TimeLineLists[indexObj].TimeLineConversationList = comments
                return data;
            }
        })
        setLoading2(false);

    }
    //hiển thị ít comment
    const hienThiItCMT = async (item) => {
        setLoading2(true);

        let result = await overViewService.getusertimelinetiles(partimelinetiles);
        console.log(result.data)
        setlstPost((data) => {
            let objItem = data.TimeLineLists.find(x => x.TileId === item.TileId);
            let indexObj = data.TimeLineLists.indexOf(objItem);
            let comments = data.TimeLineLists[indexObj].TimeLineConversationList;
            if (result.data.TimeLineLists[indexObj].TimeLineConversationList != null) {
                comments = [...result.data.TimeLineLists[indexObj].TimeLineConversationList]
                data.TimeLineLists[indexObj].TimeLineConversationList = comments;
                setpagenum(pagenum - 1);
                return data;
            }
            else {
                alert('Không còn bình luận nào để hiển thị')
                data.TimeLineLists[indexObj].TimeLineConversationList = comments
                return data;
            }
        })
        setLoading2(false);
    }
    //like
    const onClickLike = async (i) => {
        var obj = {
            ShareId: i.ShareId,
            TileId: i.TileId
        }
        await overViewService.likeupdateovertimeline(obj);
        let result4 = await overViewService.getusertimelinetiles(partimelinetiles);
        setlstPost(result4.data);
    }
    // xóa comment
    const editCMT = async (id) => {
        await overViewService.insertupdatedeleteconversationcomments(id);
        loadApi(search, partimelinetiles);
    }
    const onDeleteComment = (item) => {
        var obj = {
            Commentcount: 0,
            ConversationId: item.ConversationId,
            ConversationText: "",
            CorporateId: 1,
            Flag: "D",
            TileId: item.TileId,
            recordsCount: 5
        }
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn xóa Nhận xét này không ',
            accept: () => editCMT(obj)
        });
    }
    // báo cáo lạm dụng cmt
    const baoCaoLDCMT = (it) => {
        if (it.IsReportedAbuse == false) {
            // item chưa được report
            setbtnBaoCaoCMT(true)
            setidTitle(it.TileId);
            setselectedItemCMT(it);
        } else {
            // đã report call here
            setbtnBaoCaoCMT1(true)
        }
        setpagenum(0);
    }
    // chỉnh sửa cmt
    const onEditComment = (item) => {
        let idDIV = 'edit' + item.ConversationId;
        let idText = 'text' + item.ConversationId;
        document.getElementById(idDIV).style.display = 'flex';
        document.getElementById(idText).style.display = 'none';
    }

    const onClickEditCMT = async (it) => {
        let idTextEdit = 'textEdit' + it.ConversationId;
        let valText = document.getElementById(idTextEdit).value;
        let idDIV = 'edit' + it.ConversationId;
        let idText = 'text' + it.ConversationId;
        var obj = {
            Commentcount: 0,
            ConversationId: it.ConversationId,
            ConversationText: valText,
            CorporateId: 1,
            Flag: 'U',
            TileId: it.TileId,
            Type: ""
        }

        if (valText != null) {
            await overViewService.insertupdatedeleteconversationcomments(obj);
            // document.getElementById(idbtn).style.display = 'none';
            document.getElementById(idDIV).style.display = 'none';
            document.getElementById(idText).style.display = 'flex';
            loadApi(search, partimelinetiles);
            alert("Cập nhật thành công")
        }


    }
    const onShowMore = async () => {
        // setLoading2(true);
        partimelinetiles.pageNumber++;
        setpartimelinetiles(partimelinetiles);
        let result = await overViewService.getusertimelinetiles(partimelinetiles);
        lstPost.TimeLineLists = lstPost.TimeLineLists.concat(result.data.TimeLineLists)
        setlstPost(lstPost)
        // setLoading2(false);
        setsobaidang(result.data.TotalRecords);
        setcountItem(lstPost.TimeLineLists.length);
        if (result.data.TimeLineLists.length == 0) {
            setshowLstPost(false)
        }
    }
    const onShowMoreMissionTask = async () => {
        // setLoading3(true);
        search.pageNumber++;
        setsearch(search);
        let result = await overViewService.getoverviewmytask(search);
        lstMyTask.MyTaskList = lstMyTask.MyTaskList.concat(result.data.MyTaskList)
        setlstMyTask(lstMyTask);
        setcountTaskList(lstMyTask.MyTaskList.length)
        if (result.data.MyTaskList.length == 0) {
            setshowmytask(false)
        }
        // setLoading3(false);
    }
    const onShowBaoCao = (a) => {
        if (a.IsReportedAbuse == false) {
            // item chưa được report
            setbtnBaoCao(true)
            setidTitle(a.TileId);
            setselectedItem(a);
        } else {
            // đã report call here
            setbtnBaoCao1(true)
        }

    }
    const sentReasonRepost = async (a, c) => {
        var obj = {
            PostedContentUserId: a.SharedBy,
            TileId: idTitle,
            ItemType: "TL",
            ReportAbuseComment: c
        }
        await overViewService.settimelinereportedabusecomment(obj);
        setbtnBaoCao(false);
        loadApi(search, partimelinetiles);
    }
    // 
    const sentReasonRepostCMT = async (a, c) => {
        debugger;
        const userDefault = getCurrentUserDefault().UserId;
        var obj = {
            Commentcount: 0,
            ConversationId: 0,
            ConversationText: '',
            Flag: '',
            ItemId: a.ConversationId,
            ItemType: 'TC',
            PostedContentUserId: a.UserId,
            TileId: a.TileId,
            ReportAbuseComment: c,
            Type: '',
            pageNumber: 1,
            recordsCount: 5,
            UserID: userDefault
        }
        await overViewService.settimelinereportedabusecomment(obj);
        setbtnBaoCaoCMT(false);
        let result4 = await overViewService.getusertimelinetiles(partimelinetiles);
        setlstPost(result4.data);

    }
    const onSubmitKTG = async (data) => {
        setFormData(data);
        reset();
    };
    const onSubmitBaoCaoLDCMT = async (data) => {
        setFormData1(data);
        reset();
    };
    const repostCall = () => {
        loadApi(search, partimelinetiles);
        setVisibleFullScreen2(true);
    }


    useEffect(() => {
        // call api here
        loadApi(search, partimelinetiles);

    }, []);
    useEffect(() => {
        // document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);

    return (
        <>
            <main className="container-fluid mt-2 overview-home">
                <div className='row'>
                    <div className='overview-left col-3 ' style={{ maxHeight: '100%', minHeight: '100%' }}>
                        <div className="p-card mb-2" >
                            <div className="align-self-center" style={{ height: '130px', backgroundImage: `url('/images/overview-user-bg.jpg')`, margin: '0px auto' }}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Image src={dataUser.UserImage} height="46px" style={{ borderRadius: "50%", marginTop: "5%" }} width="46px" alt="Hình ảnh người dùng tóm tắt trong hồ sơ" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", fontWeight: "700", color: "white" }}>{dataUser.UserName}</div>
                                <div style={{ display: "flex", justifyContent: "center", fontSize: "12px", color: "white" }}>{dataUser.JobRoleName}</div>
                            </div>
                            <div className="p-card-body">
                                <div className='d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-column text-center'>
                                        <span>
                                            <Image src="/images/skills.png" alt="Biểu tượng kỹ năng tóm tắt trong hồ sơ" width="14px" className="mr-2 mb-2" />
                                            Kỹ năng
                                        </span>
                                        <span>{dataUser.TotalSkills}</span>
                                    </div>
                                    <div className='d-flex flex-column text-center'>
                                        <span>
                                            <Image src="/images/sao.jpg" alt="Biểu tượng kỹ năng tóm tắt trong hồ sơ" width="14px" className="mr-2 mb-2" />
                                            Điểm
                                        </span>
                                        <span>{dataUser.GamificationPoints}</span>
                                    </div>
                                    <div className='d-flex flex-column text-center'>
                                        <span>
                                            <Image src="/images/badges-icon.jfif" alt="Biểu tượng kỹ năng tóm tắt trong hồ sơ" width="14px" className="mr-2 mb-2" />
                                            Danh hiệu
                                        </span>
                                        <span>{dataUser.GamificationBadges}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-card mb-2" style={{ height: '61vh' }} >
                            <div className="p-card-body" >
                                <span style={{ fontWeight: "500", width: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="p-card-title">Các khóa đào tạo sắp tới</span>
                                <div >
                                    <LoadingPanel loading={loading1} >
                                        {lstTraining.MyTrainingList && lstTraining.MyTrainingList.map((item, index) => {
                                            return (
                                                <div key={index}>

                                                    <TrainningCourse
                                                        name={item.ILTName} status={item.UserStatus}
                                                        onclick={() => onClickTitle(item)}
                                                        description={item.SessionName} attendance={item.UserCount}
                                                        day={item.SessionDay} month={item.SessionMonthYear}></TrainningCourse>
                                                </div>
                                            )
                                        })}

                                    </LoadingPanel>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='overview-center  col-6 scroll-wrapper' style={{}} >
                        <div className="" >
                            <div className=" p-card-body" >
                                <div>
                                    <div className='p-3 rounded-3 bg-white' style={{}}>
                                        <h3>Tường hoạt động <a onClick={() => clickOnSetting()} className='pull-right' style={{ color: "black", cursor: "pointer" }}><i className="fa-solid fa-rss"></i></a></h3>
                                        <InputTextarea className='w-100' placeholder='Bạn đang nghĩ gì ?' onClick={() => onClickCreatePost()} />
                                    </div>
                                    <div className='mt-3 ' style={{ height: '67.5vh', maxHeight: '67.5vh', minHeight: '67.5vh' }}>
                                        <div className='scroll-wrapper' style={{}}>

                                            <LoadingPanel loading={loading2} >
                                                {
                                                    lstPost.TimeLineLists && lstPost.TimeLineLists.map((item, index) => {
                                                        const userDefault = getCurrentUserDefault().UserId;
                                                        return (
                                                            <div key={index} className='shadow-2 bg-white rounded-3 mb-3' style={{ border: '1px solid #ccc' }}>
                                                                <Toast ref={toast} />
                                                                {
                                                                    (
                                                                        (
                                                                            item.SharedBy != userID ?
                                                                                //TH duoc nguoi khac chia se
                                                                                <PostItem avatar={item.OriginatorThumbnail}
                                                                                    onclickLike={() => onClickLike(item)}
                                                                                    colorRepost={item.IsReportedAbuse == true ? "#f17479" : "rgb(167, 164, 164)"}
                                                                                    colorLike={item.IsLiked == true ? "rgb(72 113 174)" : "rgb(167, 164, 164)"}
                                                                                    isShow={false}
                                                                                    isShareAction={true}
                                                                                    onclickSearch={() => onClickSearchPost(item.TileId)}
                                                                                    name={item.OriginatorName}
                                                                                    status={item.OriginatorRole}
                                                                                    timeAgo={item.PostedDate}
                                                                                    description={item.Tittle}
                                                                                    image={item.InlineImage}
                                                                                    likeCount={item.LikeCount}
                                                                                    comment={item.CommentCount}
                                                                                    onComment={(x) => {
                                                                                        onCommentItem(x, item)
                                                                                    }}
                                                                                    onShowBaoCao={() => {
                                                                                        onShowBaoCao(item)
                                                                                    }}
                                                                                    onClickSearchPost={() => {
                                                                                        onClickSearchPost(item.TileId)
                                                                                    }}
                                                                                    onRemoveItem={() => {
                                                                                        onRemoveItem(item.ShareId, item.TileId)
                                                                                    }}
                                                                                    onBlockItem={() => {
                                                                                        onBlockItem(item)
                                                                                    }}
                                                                                    share={item.SharedCount}
                                                                                    AttachementName={item.AttachementName}
                                                                                    Attachement={item.Attachement}
                                                                                    showLamDung={userDefault == item.SharedBy ? false : true}
                                                                                    SharedByUserName={item.SharedByUserName}
                                                                                    item={item}
                                                                                >
                                                                                </PostItem>
                                                                                :
                                                                                //TH dang bai ca nhan
                                                                                <PostItem avatar={item.OriginatorThumbnail}
                                                                                    colorRepost={item.IsReportedAbuse == true ? "#f17479" : "rgb(167, 164, 164)"}
                                                                                    onclickLike={() => onClickLike(item)}
                                                                                    colorLike={item.IsLiked == true ? "rgb(72 113 174)" : "rgb(167, 164, 164)"}
                                                                                    onclickSearch={() => onClickSearchPost(item.TileId)}
                                                                                    isShow={true}
                                                                                    isShareAction={false}
                                                                                    onDelete={() => {
                                                                                        onDeleteItem(item.TileId)
                                                                                    }}
                                                                                    onComment={(x) => {
                                                                                        onCommentItem(x, item)
                                                                                    }}
                                                                                    name={item.OriginatorName}
                                                                                    status={item.OriginatorRole}
                                                                                    timeAgo={item.PostedDate}
                                                                                    description={item.Tittle}
                                                                                    image={item.InlineImage}
                                                                                    likeCount={item.LikeCount}
                                                                                    comment={item.CommentCount}
                                                                                    share={item.SharedCount}
                                                                                    onShare={() => onClickSearchPost(item.TileId)}
                                                                                    AttachementName={item.AttachementName}
                                                                                    Attachement={item.Attachement}
                                                                                    showLamDung={userDefault == item.SharedBy ? false : true}
                                                                                    SharedByUserName={false}
                                                                                    item={item}
                                                                                >
                                                                                </PostItem>
                                                                        )
                                                                    )
                                                                }

                                                                {/* <div style={{ backgroundColor: "#cbbdbd33", borderRadius: "8px", paddingTop: "12px", marginBottom: "20px" }}> */}
                                                                <div style={{ background: 'rgb(230, 230, 230)' }}>
                                                                    {
                                                                        (
                                                                            item.TimeLineConversationList && item.TimeLineConversationList.map((it, idx) => {
                                                                                const userDefault = getCurrentUserDefault().UserId;
                                                                                let idCMTEdit = 'edit' + it.ConversationId;
                                                                                let idTextEdit = 'textEdit' + it.ConversationId;
                                                                                let idText = 'text' + it.ConversationId;
                                                                                let idbtn = 'btn' + it.ConversationId;
                                                                                return (
                                                                                    <div className='mr-2' key={idx} style={{ display: "flex", background: '#e6e6e6', justifyContent: 'center', alignItems: 'center' }}>
                                                                                        <div href="" className='flex-shrink-0'>
                                                                                            <Image src={it.UserThumbnail} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: "10px", border: '1px solid #3333' }} />
                                                                                        </div>
                                                                                        <div className='container_cmt' style={{ backgroundColor: "#f3f3f3", borderRadius: "5px", marginTop: "15px", marginBottom: "15px", width: "100%" }}>
                                                                                            <div style={{ margin: "5px 0px 0px 0px" }}>
                                                                                                <div className='pl-3' style={{ margin: "5px 0px 0px 0px", display: "flex", justifyContent: "space-between" }}>
                                                                                                    <div style={{ display: "flex" }}>
                                                                                                        <span>{it.UserName}</span> &nbsp;
                                                                                                    </div>
                                                                                                    <div className='text-right' style={{ display: 'flex' }}>
                                                                                                        <div style={{ marginRight: '8px' }}>
                                                                                                            <span style={{ fontSize: '12px', color: 'rgb(135 134 134)' }}>({it.PostedDuration})</span>
                                                                                                        </div>
                                                                                                        <div style={{ display: 'flex', marginRight: '8px', borderLeft: '1px solid #3333' }}>
                                                                                                            <AiFillLike onClick={() => likeCMT(it)}
                                                                                                                style={{
                                                                                                                    cursor: 'pointer', fontSize: '20px',
                                                                                                                    marginRight: '4px', color: 'rgb(167, 164, 164)', marginLeft: '8px'
                                                                                                                }}>

                                                                                                            </AiFillLike>
                                                                                                            <div>
                                                                                                                <span style={{ textAlign: 'center' }}>{it.LikeCount}</span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        {it.UserId != userDefault &&
                                                                                                            <div style={{ borderLeft: '1px solid #3333', paddingLeft: '2px' }}>
                                                                                                                <i className='fa fa-flag' style={{
                                                                                                                    color: (it.IsReportedAbuse == true ? "#f17479" : "rgb(167, 164, 164)"), marginLeft: "7px",
                                                                                                                    marginRight: "10px"
                                                                                                                }}></i>
                                                                                                            </div>
                                                                                                        }
                                                                                                        <div className="sort-dropdown dropdown" style={{ width: "20px", borderLeft: '1px solid #3333' }}>
                                                                                                            <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                                {/* <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", marginTop: "4px" }}></RiMore2Fill> */}
                                                                                                                <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true" style={{ cursor: "pointer", color: "#656565" }}></i>
                                                                                                            </a>
                                                                                                            {it.UserId == userDefault ?
                                                                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                                                                    <li><a onClick={() => onDeleteComment(it)} className="dropdown-item">Xóa</a></li>
                                                                                                                    <li><a onClick={() => onEditComment(it)} className="dropdown-item">Chỉnh sửa</a></li>
                                                                                                                </ul>
                                                                                                                :
                                                                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                                                                    <li><a onClick={() => baoCaoLDCMT(it)} className="dropdown-item">Báo cáo lạm dụng</a></li>
                                                                                                                </ul>
                                                                                                            }

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <hr></hr>
                                                                                                <div>
                                                                                                    <div className='pt-2 pr-3 pb-2 pl-3' id={idText} style={{}}>{it.ConversationText}</div>
                                                                                                    <div className='ml-3' style={{ display: "none", }} id={idCMTEdit} >
                                                                                                        <input id={idTextEdit} style={{ width: "80%" }} type="text" className="form-control mb-4" placeholder="Nhập nội dung " />
                                                                                                        <button id={idbtn} onClick={() => onClickEditCMT(it)} className='btn' style={{ marginLeft: "10px", width: "60px", height: "32px", marginRight: "10px", backgroundColor: "rgba(204, 204, 204, 0.38)", border: "1px solid #ccc" }}>Gửi</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )

                                                                            })
                                                                        )
                                                                    }


                                                                    {item.CommentCount > 1 ?
                                                                        (item.TimeLineConversationList.length != item.CommentCount ?
                                                                            <div className='ml-3 pb-2' style={{ cursor: "pointer" }} onClick={() => xemThemComment(item)}>Xem nhiều hơn</div> :
                                                                            <div className='ml-3 pb-2' style={{ cursor: "pointer" }} onClick={() => hienThiItCMT(item)}>Hiển thị ít hơn</div>
                                                                        )
                                                                        : " "}

                                                                </div>

                                                            </div>
                                                        )

                                                    })
                                                }
                                            </LoadingPanel>
                                            <Dialog header="Bạn có thực sự muốn báo cáo lạm dụng không? Nêu lý do *" visible={btnBaoCao} onHide={() => setbtnBaoCao(false)}  >
                                                <form className="row g-3" onSubmit={handleSubmit(onSubmitKTG)}>
                                                    <div className="mb-3 field">
                                                        <span className="p-float-label">
                                                            <Controller name="ReportAbuseComment" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                                                <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                                                            )} />
                                                        </span>
                                                        {getFormErrorMessage('ReportAbuseComment', errors)}
                                                    </div>
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <Button className="btn btn-primary mr-3" label="Đồng ý" autoFocus type="submit" onClick={() => sentReasonRepost(selectedItem, getValues('ReportAbuseComment'))} />
                                                        <Button label="Hủy bỏ" onClick={() => setbtnBaoCao(false)} className="p-button-text" />
                                                    </div>
                                                </form>
                                            </Dialog>
                                            <Dialog header="Bài đăng đã bị báo cáo trước đó" visible={btnBaoCao1} onHide={() => setbtnBaoCao1(false)}  >
                                            </Dialog>

                                            {/* Báo cáo lạm dụng cmt */}
                                            <Dialog header="Bạn có thực sự muốn báo cáo lạm dụng không? Nêu lý do *" visible={btnBaoCaoCMT} onHide={() => setbtnBaoCaoCMT(false)}  >
                                                <form className="row g-3" onSubmit={handleSubmit(onSubmitBaoCaoLDCMT)}>
                                                    <div className="mb-3 field">
                                                        <span className="p-float-label">
                                                            <Controller name="ReportAbuseComment" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                                                <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                                                            )} />
                                                        </span>
                                                        {getFormErrorMessage('ReportAbuseComment', errors)}
                                                    </div>
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <Button className="btn btn-primary mr-3" label="Đồng ý" autoFocus type="submit" onClick={() => sentReasonRepostCMT(selectedItemCMT, getValues('ReportAbuseComment'))} />
                                                        <Button label="Hủy bỏ" onClick={() => setbtnBaoCaoCMT(false)} className="p-button-text" />
                                                    </div>
                                                </form>
                                            </Dialog>
                                            <Dialog header="Bình luận đã bị báo cáo trước đó" visible={btnBaoCaoCMT1} onHide={() => setbtnBaoCaoCMT1(false)}  >
                                            </Dialog>


                                            {
                                                countlinetile >= 5 &&
                                                <div className="world-round-sec pt-2 pb-2 mt-2" style={{ textAlign: "center", backgroundColor: "#fff", borderRadius: '3px' }}>
                                                    {showLstPost == true ?
                                                        <a onClick={() => onShowMore()} style={{ padding: "8px", color: "#3d4758", fontSize: "1.5em", cursor: "pointer" }}>
                                                            <i style={{ cursor: 'pointer' }} className="fa fa-angle-double-down" id="loadMoreIcon"></i>
                                                        </a>
                                                        : ""
                                                    }

                                                </div>
                                            }
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='overview-right  col-3 scroll-wrapper' >
                        <div className="p-card my-task">
                            <div className="p-card-body" style={{ backgroundColor: "#eef0f3" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div> <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '700' }} className="">Nhiệm vụ của tôi ({countTaskList}) </span></div>

                                    {/* <span style={{ lineHeight: "24px", textAlign: "center", fontWeight: "700" }}>{format(new Date(), 'P', { locale: vi })}</span> */}


                                </div>
                                <div className='scrollRight' style={{ width: "100%", height: '77vh', maxHeight: '77vh', minHeightheight: '77vh', overflow: "auto" }}>
                                    <LoadingPanel loading={loading3} >
                                        {lstMyTask.MyTaskList && lstMyTask.MyTaskList.map((item, index) => {
                                            let date = item.ExpiryDay + ' ' + item.ExpiryMonth + ' ' + item.ExpiryYear;
                                            return (
                                                <div key={index}>

                                                    <MissionTask name={item.CourseName}
                                                        onclick={() => onClickTitle(item)}
                                                        category={item.CourseTypeName}
                                                        action={item.LearningFlag}
                                                        date={date == "- null " ? " " : date}
                                                        status={item.Status}
                                                        progress={item.Progress}> </MissionTask>
                                                </div>
                                            )

                                        })}
                                    </LoadingPanel>
                                    {countMyTask >= 10 &&
                                        <div className="world-round-sec pt-1 pb-1 mt-1" style={{ textAlign: "center", backgroundColor: "#fff", borderRadius: '3px' }}>
                                            {
                                                showmytask == true &&
                                                <a onClick={() => onShowMoreMissionTask()} style={{ padding: "8px", color: "#3d4758", fontSize: "1.5em", cursor: "pointer" }}>
                                                    <i className="fa fa-angle-double-down" id="loadMoreIcon"></i>
                                                </a>
                                            }

                                        </div>
                                    }

                                </div>

                            </div>
                        </div>

                    </div>

                </div>



                <Post shareTree={shareTree} createCallBack={() => createCall()} onclickshow={() => setVisibleFullScreen(false)}
                    visiblefull={visibleFullScreen}
                >
                </Post>
                <SearchPost shareTree={shareTree} shareCallBack={() => shareCall()} postId={postshare} onclickshow={() => setVisibleFullScreen1(false)}
                    visiblefull={visibleFullScreen1}
                >
                </SearchPost>
                {/* settingCallBack={() => settingCall()} */}
                <SettingOverview shareTree={shareTree} repostCallBack={() => repostCall()} onclickshow={() => setVisibleFullScreen2(false)}
                    visiblefull={visibleFullScreen2} lstUserBlock={lstUserBlock}
                >
                </SettingOverview>
                <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                    {
                        <>
                            <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                            <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} /></>
                    }
                </Sidebar>



            </main >


        </>

    )
}
export default OverviewLayout;