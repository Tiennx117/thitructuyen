import { Card } from "primereact/card";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import './style/conversationContainer.scss'
import ConversationContainerForm from './ConversationContainerForm/ConversationContainerForm'
const imguser = window.location.origin + '/images/user2.png';
const imguser1 = window.location.origin + '/images/user-icon.png';
const imguser2 = window.location.origin + '/images/user1.png';
const imgopenform = window.location.origin + '/images/icon-open-form.png';
import { conversationService } from 'services/conversationService';
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import SearchSurvay from './SearchSurvay';
import { FaComment, FaShareSquare } from 'react-icons/fa'
import { RiMore2Fill } from 'react-icons/ri'
import ItemTopic from './ItemTopic'
import Post from '../../overview/components/Post'
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { Dialog } from 'primereact/dialog';
import { useForm, Controller } from 'react-hook-form';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { Image } from 'components/Image';
import { classNames } from 'primereact/utils';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { overViewService } from 'services/overViewService';
import { useQuery } from "shared/hooks/useQuery";
import { InputTextarea } from 'primereact/inputtextarea';

const ConversationContainer = () => {
    let query = useQuery();
    let itemId = query.get('id');

    const [showEdit, setshowEdit] = useState('');
    const [idConversation, setidConversation] = useState('');
    const { t } = useTranslation();
    const [shareTree, setshareTree] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [conversationlist, setconversationlist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [conversationdetail, setconversationdetail] = useState(null);
    const [boxItem, setboxItem] = useState('')
    const [conversationdefault, setcconversationdefault] = useState({});
    const [visibleFullScreen1, setVisibleFullScreen1] = useState(false);
    const [postshare, setpostshare] = useState({});
    const [btnBaoCao, setbtnBaoCao] = useState(false);
    const [btnBaoCao1, setbtnBaoCao1] = useState(false);
    const [btnBaoCao2, setbtnBaoCao2] = useState(false);
    const [btnBaoCao3, setbtnBaoCao3] = useState(false);
    const [selectedItem, setselectedItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [idTitle, setidTitle] = useState("");
    const [filterDown1, setFilterDown1] = useState("FR");
    const [filterDown, setFilterDown] = useState("FR");
    const [defaultColor, setdefaultColor] = useState('activeDefault');
    const [search, setsearch] = useState({
        "CorporateID": 1,
        "WebAppFlag": "W",
        "assignedFilterBy": "",
        "pageNumber": 1,
        "pageSize": 10,
        "conversationId": 0,
        "recordsCount": 10,
        "searchText": "",
        "searchType": "",
        "sortColumn": "",
        "sortOrder": "desc",
        "searchBy": null,
        "filterBy": "0",
    });
    const { control, formState: { errors }, handleSubmit, reset, getValues } = useForm({});
    const filterCourse = async (value) => {
        setLoading(true);
        if (itemId != null) {
            value.conversationId = parseInt(itemId);
        }
        let result = await conversationService.getconversationlist(value);
        setconversationlist(result.data)
        setLoading(false);
    }
    const [advanceSearch, setAdvanceSearch] = useState({
        WebAppFlag: "W",
        filterBy: "0",
        assignedFilterBy: "",
        pageNumber: 1,
        pageSize: 10,
        searchBy: null,
        sortOrder: "desc",
        CorporateID: 1,
        searchType: "",
        recordsCount: 10,
        conversationId: 0,
        sortColumn: 'FR',
        searchText: ""

    });

    const [keySearch, setKeysearch] = useState('');
    const [keySearch1, setKeysearch1] = useState('');

    useEffect(() => {
        // call api here
        loadApi(advanceSearch);
        filterCourse(advanceSearch);
    }, [advanceSearch]);

    const filterItems = [
        {
            value: 'FR',
            text: 'LÀM MỚI'
        },
        {
            value: 'CR',
            text: 'NGÀY TẠO'
        }
    ]
    const filterItems1 = [
        {
            value: 'FR',
            text: 'LÀM MỚI'
        },
        {
            value: 'CR',
            text: 'NGÀY TẠO'
        }
    ]
    const onChangeFilter = (item) => {
        setFilterDown(item.value);
        setAdvanceSearch({ ...search, ...advanceSearch, sortColumn: item.value });
    }
    const onChangeFilter1 = async (item, b) => {
        let obj = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": b,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": item.value,
        }
        setFilterDown1(item.value);
        let result = await conversationService.getconversationtopics(obj);
        setconversationdetail(result.data)
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
    const loadApi = async (val) => {
        if (itemId != null) {
            val.conversationId = parseInt(itemId);
        }
        let lstconversation = await conversationService.getconversationlist(val);
        let lstTree = await overViewService.getsharetreejson();
        let arrTree = JSON.parse(lstTree.data.TreeJson);
        setconversationlist(lstconversation.data);
        getdetailconversation(lstconversation.data[0]);
        printList1(arrTree[0]);
        printList(arrTree[0]);
        setshareTree(arrTree);
    }
    function onKeySearchChange(text) {
        let newText = text.trim();
        setKeysearch(newText);

    }
    function onKeySearchChange1(text) {
        let newText = text.trim();
        setKeysearch1(newText);
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim();
            setAdvanceSearch({ ...search, ...advanceSearch, searchText: newText, sortColumn: filterDown });
        }
    }
    // chia sẻ bài đăng
    function onClickSearchPost(id) {
        setVisibleFullScreen1(true)
        // setpostshare(id)
    }
    const keyDown1 = async (e, b) => {
        let newText = e.target.value.trim();
        if (e.key == 'Enter') {
            let obj = {
                "CorporateId": "1",
                "IsConversation": false,
                "conversationId": b,
                "RecordCount": 10,
                "pageNumber": 1,
                "SearchText": newText,
                "SearchType": "",
                "SortOrder": "desc",
                "sortColumn": filterDown1,
            }
            let result = await conversationService.getconversationtopics(obj);
            setconversationdetail(result.data)
        }
    }
    const btnDetailConversation = async (a, b) => {
        let obj = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": b,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": a,
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "FR",
        }
        let result = await conversationService.getconversationtopics(obj);
        setconversationdetail(result.data)
    }

    const getdetailconversation = async (item, idx) => {
        let obj = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": item.conversationId,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "FR",
        }
        let result = await conversationService.getconversationtopics(obj);
        setconversationdetail(result.data)
        setboxItem('boxItem' + idx);
        setdefaultColor("0");
        setidConversation(item.conversationId)

        // debugger;
        // let id = "coversation" + idx;
        // document.getElementById(id).style.background = "#3333";

    }
    //cmt 
    const onCommentItem = async (a, b) => {
        let obj = {
            Commentcount: 0,
            ConversationId: b.conversationId,
            CorporateId: 1,
            Flag: "I",
            Type: "Topic",
            pageNumber: 1,
            recordsCount: 0,
            ParentThreadId: b.topicId,
            ThreadId: 0,

        }
        const targetObject = Object.assign(a, obj);
        await conversationService.insertupdatedeletecomments(targetObject);

        let obj1 = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": b.conversationId,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "CR",
        }
        let result = await conversationService.getconversationtopics(obj1);
        setconversationdetail(result.data)
    }
    //sửa cmt
    const onEditComment = (item) => {
        // let idDIV = 'edit' + item.ParentThreadId;
        // let idText = 'text' + item.ParentThreadId;
        // document.getElementById(idDIV).style.display = 'flex';
        // document.getElementById(idText).style.display = 'none';
    }
    const onClickEditCMT = async (it) => {
        let idTextEdit = 'textEdit' + it.ParentThreadId;
        let valText = document.getElementById(idTextEdit).value;
        let idDIV = 'edit' + it.ParentThreadId;
        let idText = 'text' + it.ParentThreadId;
        var obj = {
            Commentcount: 0,
            ConversationId: it.ConversationId,
            CommentText: valText,
            ParentThreadId: it.topicId,
            CorporateId: 1,
            Flag: 'U',
            TileId: it.TileId,
            Type: "Topic",
            ThreadId: it.ThreadId,
            recordsCount: 0
        }

        if (valText != null) {
            await conversationService.insertupdatedeletecomments(obj);
            // document.getElementById(idbtn).style.display = 'none';
            // document.getElementById(idDIV).style.display = 'none';
            // document.getElementById(idText).style.display = 'flex';
            let obj1 = {
                "CorporateId": "1",
                "IsConversation": false,
                "conversationId": it.ConversationId,
                "RecordCount": 10,
                "pageNumber": 1,
                "SearchText": "",
                "SearchType": "",
                "SortOrder": "desc",
                "sortColumn": "FR",
            }
            let result = await conversationService.getconversationtopics(obj1);
            setconversationdetail(result.data);
            alert("Cập nhật thành công")
        }
        setshowEdit('');
    }
    //xem them
    const xemThemComment = async (item) => {
        setLoading(true);
        let obj = {
            ConversationId: item.comment[0].ConversationId,
            Commentcount: 0,
            CommentText: "",
            CorporateId: 1,
            Flag: "",
            ParentThreadId: item.topicId,
            Type: "Topic",
            pageNumber: item.comment.length,
            recordsCount: 5,
            ThreadId: 0,

        };
        let result = await conversationService.getprevcommentslisting1(obj);

        setconversationdetail((data) => {
            let objItem = data.ConversationTopics.find(x => x.topicId === item.topicId);
            let indexObj = data.ConversationTopics.indexOf(objItem);
            let comments = data.ConversationTopics[indexObj].comment;
            // comments = [...comments, ...result.data.CommentList]
            //     data.ConversationTopics[indexObj].comment = comments;
            //     return data;
            if (result.data.CommentList != null) {
                comments = [...comments, ...result.data.CommentList]
                data.ConversationTopics[indexObj].comment = comments;
                return data;
            }
            else {
                alert('Không còn bình luận nào để hiển thị')
                data.ConversationTopics[indexObj].comment = comments
                return data;
            }
        })
        setLoading(false);

    }
    // xóa cmt topic
    const editCMT = async (id, a) => {
        await conversationService.insertupdatedeletecomments(id);
        let obj = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": a,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "FR",
        }
        let result = await conversationService.getconversationtopics(obj);
        setconversationdetail(result.data)

    }
    const onDeleteComment = (item) => {
        var obj = {
            CommentText: "",
            Commentcount: 0,
            ConversationId: 0,
            ConversationText: "",
            CorporateId: 1,
            Flag: "D",
            ParentThreadId: 0,
            ThreadId: item.ThreadId,
            Type: "",
            recordsCount: 0
        }
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn xóa Nhận xét này không ',
            accept: () => editCMT(obj, item.ConversationId)
        });
    }

    // báo cáo lạm dụng topic
    const baoCaoLamDung = (a) => {
        if (a.IsReportedRebuse == false) {
            // item chưa được report
            setbtnBaoCao(true)
            setidTitle(a.TileId);
            setselectedItem(a);
        } else {
            // đã report call here
            setbtnBaoCao1(true)
        }
    }
    //Xóa topic
    const deleteTopic = (a) => {
        var obj = {
            conversationId: idConversation,
            topicId: a.topicId,
            LoggedInUserId: a.userId
        }
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn xóa Topic này không ',
            accept: () => XoaTopic(obj)
        });
    }
    const XoaTopic = async (obj) => {
        await conversationService.deletetopics(obj)
        let obj1 = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": idConversation,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "FR",
        };
        let result = await conversationService.getconversationtopics(obj1);
        setconversationdetail(result.data)
    }
    const sentReasonRepost = async (a, c) => {
        var obj = {
            ItemId: a.conversationId,
            PostedContentUserId: a.userId,
            ItemType: "D",
            ThreadId: a.topicId,
            reportAbuseComment: c
        }
        await conversationService.addrebusereportcomment(obj);
        setbtnBaoCao(false);
        let obj1 = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": a.conversationId,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "FR",
        }
        let result = await conversationService.getconversationtopics(obj1);
        setconversationdetail(result.data);
    }
    const onSubmitKTG = async (data) => {
        setFormData(data);
        reset();
    };
    //bao cao lam dung cmt
    const onBaoCaoComment = (a) => {
        if (a.IsReportedRebuse == false) {
            // item chưa được report
            setbtnBaoCao2(true)
            setidTitle(a.TileId);
            setselectedItem(a);
        } else {
            // đã report call here
            setbtnBaoCao3(true)
        }
    }
    const sentReasonRepost1 = async (a, c) => {
        var obj = {
            ItemId: a.ConversationId,
            PostedContentUserId: a.UserId,
            ItemType: "D",
            ThreadId: a.ThreadId,
            reportAbuseComment: c
        }
        await conversationService.addrebusereportcomment(obj);
        setbtnBaoCao2(false);
        let obj1 = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": a.ConversationId,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "FR",
        }
        let result = await conversationService.getconversationtopics(obj1);
        setconversationdetail(result.data);
    }
    const onSubmitBaoCaoCMT = async (data) => {
        setFormData(data);
        reset();
    };
    const onHidenFormTopPic = async () => {
        setDisplayBasic(false);
        let obj1 = {
            "CorporateId": "1",
            "IsConversation": false,
            "conversationId": idConversation,
            "RecordCount": 10,
            "pageNumber": 1,
            "SearchText": "",
            "SearchType": "",
            "SortOrder": "desc",
            "sortColumn": "FR",
        };
        let result = await conversationService.getconversationtopics(obj1);
        setconversationdetail(result.data)
        loadApi(advanceSearch);
    }

    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);

    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    function renderdataconversationlist() {
        return (
            <div className="col-md-5 scroll-wrapper" >
                <Card title={t('key-title', 'Cuộc trò chuyện')}>
                    <div style={{ display: "flex", marginBottom: "14px" }}>
                        <div className="p-inputgroup" style={{ width: '488px' }}>
                            <InputText onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />
                            <Button onClick={() => {
                                setAdvanceSearch({ ...advanceSearch, searchText: keySearch });
                            }} icon="pi pi-search" />

                        </div>
                        <div className='flex-grow-1'>
                            <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                        </div>
                    </div>
                    <div className="card text-center list-card">
                        <div className="card-header" style={{ fontWeight: 600, borderBottom: "1px solid #dee2e6 " }}>
                            <span>TIÊU ĐỀ</span><span className="mr-7" style={{ float: 'right' }}>LÀM MỚI</span>
                        </div>
                        <div >
                            <LoadingPanel loading={loading} >
                                {/* <div className="card-body"> */}
                                <div>
                                    {
                                        conversationlist && conversationlist.map((item, idx) => {
                                            return (
                                                <div id={"coversation" + idx} className={boxItem == 'boxItem' + idx ? 'bodyItem1' : defaultColor + idx} key={idx} style={{ height: "70px", borderBottom: "1px solid #dee2e6 ", borderLeft: "1px solid #dee2e6 ", borderRight: "1px solid #dee2e6 " }}>
                                                    <div>
                                                        <div className=" w-100">
                                                            <div className="titleConversation" style={{ float: 'left', textAlign: 'left', width: '80%', paddingLeft: "20px", cursor: "pointer" }} onClick={() => getdetailconversation(item, idx)} >
                                                                <b>{item.conversationTitle}</b>
                                                            </div>
                                                            <div style={{ width: '20%', float: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left' }}>
                                                                <b>{item.userName}</b>
                                                            </div>
                                                        </div>
                                                        <div className="contributors">
                                                            <Image className="cont-img" src={imguser} />
                                                            <Image className="cont-img" src={imguser1} />
                                                            <Image className="cont-img" src={imguser2} />
                                                            <span className="contributors-text">{item.contributor} người đóng góp</span>
                                                            {/* <a style={{ cursor: "pointer" }} className="share" title="Chia sẻ" onClick={() => onClickSearchPost(item)}>
                                                                <i><FaShareSquare /></i>
                                                            </a> */}
                                                        </div>
                                                        <ul className="views-topics">
                                                            <li style={{ marginLeft: '20%' }}>{item.topics} chủ đề</li>
                                                            <li style={{ marginLeft: '22%' }}>{item.timeSpan}</li>
                                                        </ul>
                                                    </div>
                                                </div>


                                            )
                                        })
                                    }

                                </div>
                            </LoadingPanel>
                        </div>

                    </div>
                </Card>
            </div>
        )
    }

    function renderdataconversationtopic() {

        return (
            <div className="col-md-7 scroll-wrapper" style={{ height: '100%' }}>

                <Card >
                    {conversationdetail &&
                        <>
                            <div>
                                <div className="box-post-detail" style={{ display: "flex" }}>
                                    <div>
                                        <Image src={conversationdetail.ConversationImgPath} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '30px', margin: "10px", border: "3px solid #3333" }} />
                                    </div>
                                    <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif", fontWeight: "700" }}>{conversationdetail.ConversationTitle}</span>
                                </div>
                                <div style={{ display: "flex", marginBottom: "20px" }}>
                                    <div className="p-inputgroup" style={{ width: '488px' }}>
                                        <InputText onKeyDown={(e) => keyDown1(e, conversationdetail.ConversationId)} onChange={(e) => onKeySearchChange1(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />
                                        <Button onClick={() => {
                                            btnDetailConversation(keySearch1, conversationdetail.ConversationId)
                                        }} icon="pi pi-search" />

                                    </div>
                                    <div className='flex-grow-1'>
                                        <DropdownFilter items={filterItems1} onChange={(e) => onChangeFilter1(e, conversationdetail.ConversationId)} />
                                    </div>
                                </div>
                                <div className="box-content" style={{ borderRadius: "4px" }}>
                                    <div className="new-content mt-3" >
                                        <span>Mô tả</span>
                                        <p className="text-mota">
                                            {conversationdetail.ConversationDesc || "Không có mô tả"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <LoadingPanel loading={loading} >
                                    {
                                        conversationdetail.ConversationTopics && conversationdetail.ConversationTopics.map((item, index) => {
                                            return (
                                                <div style={{ border: '1px solid rgb(212, 212, 212)', marginTop: '10px', borderRadius: '4px' }} key={index}>
                                                    {item.comment != null ?
                                                        <div>
                                                            <div>
                                                                <ItemTopic
                                                                    conversationTitle={item.conversationTitle}
                                                                    TopicImagePath={item.TopicImagePath}
                                                                    avatar={item.UserImagePath}
                                                                    name={item.userName}
                                                                    status={item.jobRole}
                                                                    timeAgo={item.topicSpan}
                                                                    topicSpan={item.topicDesc}
                                                                    topicTitle={item.topicTitle}
                                                                    comment={item.numberOfComments}
                                                                    image={item.ConversationImagePath}
                                                                    onComment={(x) => {
                                                                        onCommentItem(x, item)
                                                                    }}
                                                                    onBaoCao={() => baoCaoLamDung(item)}
                                                                    onDelete={() => deleteTopic(item)}
                                                                    id={item.userId}
                                                                    colorRepost={item.IsReportedRebuse == true ? "#f17479" : "rgb(167, 164, 164)"}
                                                                ></ItemTopic>
                                                            </div>
                                                            <div style={{ backgroundColor: "#cbbdbd33", padding: "12px" }}>
                                                                {

                                                                    (
                                                                        item.comment && item.comment.map((it, idx) => {
                                                                            let idCMTEdit = 'edit' + it.ParentThreadId;
                                                                            let idTextEdit = 'textEdit' + it.ParentThreadId;
                                                                            let idText = 'text' + it.ParentThreadId;
                                                                            let idbtn = 'btn' + it.ParentThreadId;
                                                                            const userDefault = getCurrentUserDefault()
                                                                            const userID = userDefault.UserId;
                                                                            return (
                                                                                <div key={idx} >
                                                                                    {it.CommentText != "" ?
                                                                                        <div className='container_cmt' style={{ boxShadow: '0px 1.2px 1.2px 0px rgb(52 51 51 / 63%)', marginBottom: "40px" }}>
                                                                                            <div style={{ border: '1px solid #dddddd' }}>
                                                                                                <div style={{ margin: "5px 0px 0px 0px", display: "flex", justifyContent: "space-between" }}>
                                                                                                    <div className="media-left">
                                                                                                        <a>
                                                                                                            <Image src={it.UserImagePath} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: "10px", border: "1px solid #3333" }} />
                                                                                                        </a>
                                                                                                    </div>
                                                                                                    <div style={{ border: '1px solid #dddddd', height: '90px', borderRadius: '10px', padding: "10px", width: '100%', backgroundColor: '#fff' }}>
                                                                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                                                            <div className="w-100">
                                                                                                                <div style={{ fontWeight: "600", width: "50%", float: "left", whiteSpace: "nowrap", textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>{it.UserName}</div>
                                                                                                                <div style={{ color: '#8b8b8b', fontSize: '14px', marginRight: '10px', fontStyle: 'italic', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.JobRole}</div>
                                                                                                            </div>
                                                                                                            <div className='text-right' style={{ display: "flex", width: "10%" }}>
                                                                                                                <div>
                                                                                                                    {it.IsReportedRebuse == true ?
                                                                                                                        <i className='fa fa-flag' style={{ color: "#f17479", marginLeft: "10px", marginTop: "12px" }}></i>
                                                                                                                        :
                                                                                                                        ""
                                                                                                                    }
                                                                                                                </div>
                                                                                                                <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                                                                                                    <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                                        <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", marginTop: "4px" }}></RiMore2Fill>
                                                                                                                    </a>
                                                                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                                                                        {userID == it.UserId ?
                                                                                                                            <>
                                                                                                                                <li><a onClick={() => onDeleteComment(it)} className="dropdown-item" href="#">Xóa</a></li>
                                                                                                                                <li><a onClick={() => { onEditComment(it), setshowEdit('edit' + index + idx) }} className="dropdown-item" href="#">Chỉnh sửa</a></li>
                                                                                                                            </>
                                                                                                                            :
                                                                                                                            <li><a onClick={() => onBaoCaoComment(it)} className="dropdown-item" href="#">Báo cáo lạm dụng</a></li>
                                                                                                                        }

                                                                                                                    </ul>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        {
                                                                                                            showEdit != 'edit' + index + idx ?
                                                                                                                <div style={{ borderTop: '1px solid #dddddd' }}>
                                                                                                                    <span id={idText} >{it.CommentText}</span>
                                                                                                                </div>
                                                                                                                :
                                                                                                                <div style={{ borderTop: '1px solid #dddddd' }}>
                                                                                                                    <div style={{ display: "flex", width: "100%", marginTop: 10 }} id={idCMTEdit} >
                                                                                                                        <input autoFocus id={idTextEdit} style={{ width: "100%", border: 'none' }} type="text" className="form-control mb-4" placeholder="Nhập nội dung " />
                                                                                                                        <button id={idbtn} onClick={() => onClickEditCMT(it)} className='btn' style={{ marginLeft: "10px", width: "60px", height: "32px", marginRight: "10px", backgroundColor: "#efefef", border: "1px solid" }}>Gửi</button>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                        }

                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>
                                                                                        </div>
                                                                                        : ""}

                                                                                </div>
                                                                            )
                                                                        })
                                                                    )
                                                                }

                                                                {/* báo cáo lạm dụng topic */}
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
                                                                <Dialog header="Bạn có thực sự muốn báo cáo lạm dụng không? Nêu lý do *" visible={btnBaoCao2} onHide={() => setbtnBaoCao2(false)}  >
                                                                    <form className="row g-3" onSubmit={handleSubmit(onSubmitBaoCaoCMT)}>
                                                                        <div className="mb-3 field">
                                                                            <span className="p-float-label">
                                                                                <Controller name="ReportAbuseComment" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                                                                    <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                                                                                )} />
                                                                            </span>
                                                                            {getFormErrorMessage('ReportAbuseComment', errors)}
                                                                        </div>
                                                                        <div className="col-12 d-flex justify-content-end">
                                                                            <Button className="btn btn-primary mr-3" label="Đồng ý" autoFocus type="submit" onClick={() => sentReasonRepost1(selectedItem, getValues('ReportAbuseComment'))} />
                                                                            <Button label="Hủy bỏ" onClick={() => setbtnBaoCao2(false)} className="p-button-text" />
                                                                        </div>
                                                                    </form>
                                                                </Dialog>
                                                                <Dialog header="Bình luận đã bị báo cáo trước đó" visible={btnBaoCao3} onHide={() => setbtnBaoCao3(false)}  >
                                                                </Dialog>

                                                                {item.numberOfComments > 1 ? <a style={{ cursor: "pointer", marginTop: "12px" }} onClick={() => xemThemComment(item)}>Hiển thị thêm nhận xét</a> : " "}
                                                            </div>
                                                        </div>
                                                        :
                                                        <span>Không có mục nào để hiển thị</span>
                                                    }

                                                </div>
                                            )
                                        })
                                    }
                                </LoadingPanel>
                            </div>

                        </>
                    }


                    {/* <a onClick={() => setDisplayBasic(true)} className="plus-circle-icon" title="Thêm chủ đề" data-placement="left" style={{ boxShadow: '1px 3px 10px 1px rgb(0 0 0 / 40%)' }}>
                        <Image src={imgopenform} alt="Add Topic"></Image>
                    </a> */}
                </Card>

            </div >
        )
    }
    return (
        <>
            <div className="my-learning-container row">
                {renderdataconversationlist()}
                {renderdataconversationtopic()}
            </div>
            <Post shareTree={shareTree} shareCallBack={() => shareCall()} postId={postshare} onclickshow={() => setVisibleFullScreen1(false)}
                visiblefull={visibleFullScreen1}
            >
            </Post>
            <ConversationContainerForm idConversation={idConversation} onShow={displayBasic} onHiden={() => onHidenFormTopPic()}></ConversationContainerForm>
        </>
    )
}
export default ConversationContainer;