import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { notificationService } from 'services/notificationService';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { BiTrash } from 'react-icons/bi';
import { Avatar } from 'primereact/avatar';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from '../learner/components/LearningDetailContainer';
import { setDetaiLearn } from "store/detaillearning/detaillearningSlice";
import { useSelector, useDispatch } from 'react-redux';
import LearningDetailNotifition from "layouts/learner/components/LearningDetailNotifition";
import { learningService } from 'services/learningService';

const ShowMoreNotification = (props) => {
    const defaultNotification = {
        TotalRecords: 0,
        TotalUnreadRecords: 0,
        NotificationItems: []
    }
    const defaultAnnouncements = {
        TotalRecords: 0,
        TotalUnreadRecords: 0,
        AnnouncementItems: []
    }

    const [titleNoti, settitleNoti] = useState("THÔNG BÁO TỪ HỆ THỐNG");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [lstNotification, setlstNotification] = useState([]);
    const [lstNotificationAdmin, setlstNotificationAdmin] = useState([]);
    const [dataNotification, setDataNotification] = useState(defaultNotification);
    const [dataAnnouncements, setAnnouncements] = useState(defaultAnnouncements);
    const [keySearch, setKeysearch] = useState('');
    const [keySearch1, setKeysearch1] = useState('');
    const [filterDown, setFilterDown] = useState("");
    const [filterDown1, setFilterDown1] = useState("");
    const [lstNotificationHeThong, setlstNotificationHeThong] = useState([]);
    const [lstNotificationQuantri, setlstNotificationQuantri] = useState([]);
    const [countNotification, setcountNotification] = useState(10);
    const [visibleRight1, setVisibleRight1] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [showDetail, setshowDetail] = useState(false);

    const [advanceSearch, setAdvanceSearch] = useState({
        CorporateId: 1,
        pageNumber: 1,
        pageSize: 20,
        SortBy: "RECENT",
    });
    const [advanceSearch1, setAdvanceSearch1] = useState({
        CorporateId: 1,
        pageNumber: 1,
        pageSize: 10,
        SortBy: "RECENT",
    });

    const filterItems = [
        {
            value: 'RECENT',
            text: 'Gần đây'
        },
        {
            value: 'READ',
            text: 'Đọc'
        },
        {
            value: 'UNREAD',
            text: 'Chưa đọc'
        }
    ]
    const filterItems1 = [
        {
            value: 'RECENT',
            text: 'Gần đây'
        },
        {
            value: 'READ',
            text: 'Đọc'
        },
        {
            value: 'UNREAD',
            text: 'Chưa đọc'
        }
    ]

    function onKeySearchChange(text) {
        let newText = text.trim();
        setKeysearch(newText);

    }
    function onKeySearchChange1(text) {
        let newText = text.trim();
        setKeysearch(newText);

    }

    const getCountItem = async () => {
        let result = await notificationService.gettotalnotificationcount();
        setcountNotification(result.data.TotalNotification);
        setAdvanceSearch({ ...advanceSearch, pageSize: result.data.TotalNotification })
    }
    const filterCourse = async (value) => {
        setLoading(true);
        let result = await notificationService.getallnotificationlist(value);
        setlstNotification(result.data);
        setLoading(false);
    }
    const filterCourse1 = async (value) => {
        setLoading(true);
        let result1 = await notificationService.getpublicannouncements(value);
        setlstNotificationAdmin(result1.data);
        setLoading(false);
    }
    const onChangeFilter = (item) => {
        setFilterDown(item.value);
        setAdvanceSearch({ ...advanceSearch, SortBy: item.value });
    }
    const onChangeFilter1 = (item) => {
        setFilterDown1(item.value);
        setAdvanceSearch1({ ...advanceSearch1, SortBy: item.value });
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim();
            setAdvanceSearch({ ...advanceSearch, SearchBy: newText, SortBy: filterDown });
        }
    }
    function keyDown1(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim();
            setAdvanceSearch1({ ...advanceSearch1, SearchBy: newText, SortBy: filterDown1 });
        }
    }
    const handleDelete = async (item) => {
        let result = await notificationService.deleteNotification(item.NotificationId);
        //setDeleted(true);
        setLoading(true);
        //setDeleted(false);
        loadApi(advanceSearch);
        setLoading(false);
    }

    const handleSetUnRead = async (item) => {
        setlstNotification(() => {
            let data = lstNotification;
            let temp = Object.assign({}, data)
            let obj = temp.NotificationItems.find(x => x.NotificationId == item.NotificationId);
            let index = temp.NotificationItems.indexOf(obj);
            temp.NotificationItems[index].IsRead = true;
            data = temp;
            return data;
        });
        item.IsRead = true;
        let result = await notificationService.setReadNotification(item.NotificationId);
    }
    const Getallnotificationlist = async () => {
        settitleNoti("THÔNG BÁO TỪ HỆ THỐNG");
        advanceSearch.SortBy = 'RECENT';
        advanceSearch.SearchBy = '';
        let result = await notificationService.getallnotificationlist(advanceSearch);
        setlstNotification(result.data);
        setlstNotificationHeThong(result.data.NotificationItems)
        setlstNotificationQuantri([]);

    }
    const Getpublicannouncements = async () => {
        settitleNoti("THÔNG BÁO TỪ QUẢN TRỊ");
        advanceSearch1.SortBy = 'RECENT';
        advanceSearch1.SearchBy = '';
        let result = await notificationService.getpublicannouncements(advanceSearch1);
        setlstNotificationAdmin(result.data)
        setlstNotificationQuantri(result.data.AnnouncementItems);
        setlstNotificationHeThong([])
        // setlstNotificationAdmin(result.data.lstNotification)
    }
    const clickTitle = (item) => {
    }
    const clickTitleLopHoc = async (it) => {
        debugger;
        let courseInfo = await learningService.getmylearningdetail(it.ItemId, true);
        const currentTime = new Date();

        var startDateString = courseInfo.data.LearningItem.StartDate;
        var endDateString = courseInfo.data.LearningItem.EndDate;

        if ((startDateString != "-" && parseDate(startDateString) > currentTime) || (endDateString != "-" && parseDate(endDateString) < currentTime)) {
            window.alert("Khóa học không nằm trong khoảng thời gian truy cập.")
        } else {
            setlstNotification(data => {
                let temp = Object.assign({}, data)
                let obj = temp.NotificationItems.find(x => x.NotificationId == it.NotificationId);
                let index = temp.NotificationItems.indexOf(obj);
                temp.NotificationItems[index].IsRead = true;
                data = temp;
                return data;
            });
            it.IsRead = true;
            let result = await notificationService.setReadNotification(it.NotificationId);
            let obj = {}
            if (it.ItemType == "ILT-DF") {
                obj.CourseType = "T";
                obj.CourseId = it.ItemId;
                obj.VisibleRight = true;
            }
            else {
                obj.CourseType = "C";
                obj.CourseId = it.ItemId;
                obj.VisibleRight = true;
            }
            setshowDetail(true)
            dispatch(setDetaiLearn(obj))
        }
    }

    function parseDate(dateString) {
        var parts = dateString.split(' ');
        var dateParts = parts[0].split('/');
        var timeParts = parts[1].split(':');

        var year = parseInt(dateParts[2], 10);
        var month = parseInt(dateParts[1], 10) - 1; // Trừ đi 1 vì tháng trong JavaScript là từ 0 đến 11
        var day = parseInt(dateParts[0], 10);
        var hour = parseInt(timeParts[0], 10);
        var minute = parseInt(timeParts[1], 10);

        return new Date(year, month, day, hour, minute);
    }

    function closeDetail() {
        setVisibleRight1(false);
        loadApi(advanceSearch);
    }

    const loadApi = async (val) => {
        let lstthongbao = await notificationService.getallnotificationlist(val);
        setlstNotification(lstthongbao.data);
        setlstNotificationHeThong(lstthongbao.data.NotificationItems)
    }
    useEffect(() => {
        filterCourse(advanceSearch);
    }, [advanceSearch]);
    useEffect(() => {
        filterCourse1(advanceSearch1);
    }, [advanceSearch1]);
    useEffect(() => {
        // call api here
        getCountItem()
        loadApi(advanceSearch);
    }, []);

    const newLocal = <div className="nav flex-column nav-pills nav-justified mb-3 p-3 mb-2 bg-light text-dark" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button className="nav-link active d-flex" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" onClick={() => Getallnotificationlist()} role="tab" aria-controls="v-pills-home" aria-selected="true">THÔNG BÁO TỪ HỆ THỐNG</button>
        <button className="nav-link d-flex" id="v-pills-help-tab" data-bs-toggle="pill" data-bs-target="#v-pills-help" onClick={() => Getpublicannouncements()} role="tab" aria-controls="v-pills-help" aria-selected="false">THÔNG BÁO TỪ QUẢN TRỊ</button>
    </div>;

    return (
        <>
            <div className="row">
                <div className="col-md-3 col-xl-3"> {newLocal} </div>
                <div className="col-md-9 col-xl-9">
                    <div className="d-flex align-items-start">
                        <div className="tab-content w-100" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                {lstNotificationHeThong.length > 0 ?
                                    <Card title={titleNoti}>
                                        <div style={{ display: "flex", marginBottom: "14px" }}>
                                            <div className="p-inputgroup" style={{ width: '488px' }}>
                                                <InputText onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />

                                                <Button onClick={() => {
                                                    setAdvanceSearch({ ...advanceSearch, SearchBy: keySearch });
                                                }} icon="pi pi-search" />

                                            </div>
                                            <div className=''>
                                                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                                            </div>
                                        </div>

                                        <div>
                                            {lstNotification && lstNotification.NotificationItems?.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        {item.IsRead == true ?
                                                            <div >
                                                                <div style={{ backgroundColor: "#33333312", borderRadius: "8px", border: "1px solid #3333330f" }} className='d-flex flex-row justify-content-between border-bottom p-3'>
                                                                    <div className="text-center" style={{ width: '50px' }}>
                                                                        <Avatar image={item.Thumbnail} label="P" size="large" className="mr-2" shape="circle" />
                                                                    </div>

                                                                    <div className='d-flex flex-column flex-grow-1 ' >
                                                                        {item.ItemType == 'DF' ?
                                                                            <Link style={{ padding: "0px", color: "#0000009e" }} className="nav-link" to={'/collaborate/conversation'}>
                                                                                <span style={{ cursor: "pointer", fontWeight: "600" }} onClick={() => clickTitle(item)}>
                                                                                    {item.NotificationSubject}
                                                                                </span>
                                                                            </Link>
                                                                            :
                                                                            <Link style={{ padding: "0px", color: "#0000009e" }} className="nav-link" to={'/learner/my-learning'}>
                                                                                <span style={{ cursor: "pointer", fontWeight: "600" }} onClick={() => clickTitleLopHoc(item)}>
                                                                                    {item.NotificationSubject}
                                                                                </span>
                                                                            </Link>
                                                                        }

                                                                        {/* /learner/my-learning */}

                                                                        <span>
                                                                            {item.NotificationBody}
                                                                        </span>

                                                                        <span className='fsx-12px'>
                                                                            {item.ReceiveDate}
                                                                        </span>
                                                                    </div>

                                                                    <div className='d-flex flex-row '>
                                                                        {
                                                                            (item.IsRead == false)
                                                                                ?
                                                                                <i style={{ color: "black", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open" onClick={() => handleSetUnRead(item)}></i>

                                                                                :
                                                                                <i style={{ color: "#3333", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open"></i>
                                                                        }
                                                                        <BiTrash onClick={() => handleDelete(item)} className='icondelete-notionbar'></BiTrash>
                                                                    </div>
                                                                </div>
                                                                <br></br>
                                                            </div> :
                                                            <div>
                                                                <div key={item.NotificationId} className='d-flex flex-row justify-content-between border-bottom p-3'>
                                                                    <div className="text-center" style={{ width: '50px' }}>
                                                                        <Avatar image={item.Thumbnail} label="P" size="large" className="mr-2" shape="circle" />
                                                                    </div>

                                                                    <div className='d-flex flex-column flex-grow-1 ' >
                                                                        {item.ItemType == 'DF' ?
                                                                            <Link style={{ padding: "0px", color: "#0000009e" }} className="nav-link" to={'/collaborate/conversation'}>
                                                                                <span style={{ cursor: "pointer", fontWeight: "600" }} onClick={() => clickTitle(item)}>
                                                                                    {item.NotificationSubject}
                                                                                </span>
                                                                            </Link>
                                                                            :
                                                                            <Link style={{ padding: "0px", color: "#0000009e" }} className="nav-link" to={'/learner/my-learning'}>
                                                                                <span style={{ cursor: "pointer", fontWeight: "600" }} onClick={() => clickTitleLopHoc(item)}>
                                                                                    {item.NotificationSubject}
                                                                                </span>
                                                                            </Link>
                                                                        }
                                                                        <span >
                                                                            {item.NotificationBody}
                                                                        </span>

                                                                        <span className='fsx-12px'>
                                                                            {item.ReceiveDate}
                                                                        </span>
                                                                    </div>

                                                                    <div className='d-flex flex-row '>
                                                                        {
                                                                            (item.IsRead == false)
                                                                                ?
                                                                                <i style={{ color: "black", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open" onClick={() => handleSetUnRead(item)}></i>

                                                                                :
                                                                                <i style={{ color: "#3333", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open"></i>
                                                                        }
                                                                        <BiTrash onClick={() => handleDelete(item)} className='icondelete-notionbar'></BiTrash>
                                                                    </div>
                                                                </div>
                                                                <br></br>
                                                            </div>
                                                        }

                                                    </div>
                                                )
                                            })
                                            }

                                            {lstNotification.NotificationItems.length == 0 && "Không có mục nào để hiển thị"}
                                        </div>
                                    </Card>
                                    : ""
                                }

                                {
                                    lstNotificationQuantri.length > 0 ?

                                        <Card title={titleNoti}>
                                            <div style={{ display: "flex", marginBottom: "14px" }}>
                                                <div className="p-inputgroup" style={{ width: '488px' }}>
                                                    <InputText onKeyDown={(e) => keyDown1(e)} onChange={(e) => onKeySearchChange1(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />
                                                    <Button onClick={() => {
                                                        setAdvanceSearch1({ ...advanceSearch1, SearchBy: keySearch });
                                                    }} icon="pi pi-search" />

                                                </div>
                                                <div className=''>
                                                    <DropdownFilter items={filterItems1} onChange={onChangeFilter1} />
                                                </div>
                                            </div>
                                            <div className="list-group list-group-flush scrollarea ">
                                                {lstNotificationAdmin.AnnouncementItems?.map((item, index) => {
                                                    return (
                                                        <div key={index} >
                                                            { // UnRead
                                                                !item.IsRead ?

                                                                    <div style={{ border: '0.4px solid rgba(128, 128, 128, 0.514) ', margin: '15px', borderRadius: "4px", backgroundColor: ' rgba(240, 239, 239, 0.863)' }} >
                                                                        <div key={item.AnnoncementId} className='d-flex flex-row justify-content-between  p-3'
                                                                        >
                                                                            <div className="text-center" style={{ width: '50px' }} >
                                                                                {/* <Avatar image={item.Thumbnail} label="P" size="large" className="mr-2" shape="circle" style={{ backgroundColor: 'rgba(128, 128, 128, 0.514)' }} /> */}
                                                                                <Avatar image='/images/Loa.jpg' label="P" size="large" className="mr-2" shape="circle" style={{ backgroundColor: 'rgba(128, 128, 128, 0.514)' }} />
                                                                            </div>

                                                                            <div className='d-flex flex-column flex-grow-1 '>
                                                                                <span >
                                                                                    {item.DetailedTitle}
                                                                                </span>
                                                                            </div>
                                                                            <div className='d-flex flex-row'>
                                                                                {(!item.IsRead == false) ?
                                                                                    // <MdOutlineMarkChatRead onClick={() => handleSetReadAnnoucements(item)} className='iconread-notionbar'></MdOutlineMarkChatRead>
                                                                                    <i onClick={() => handleSetReadAnnoucements(item)} style={{ color: "#3333", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open"></i>
                                                                                    :
                                                                                    // <MdOutlineMarkChatUnread onClick={() => handleSetUnReadAnnoucements(item)} className='iconread-notionbar'></MdOutlineMarkChatUnread>
                                                                                    <i style={{ color: "black", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open" onClick={() => handleSetUnReadAnnoucements(item)}></i>
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                        <hr />

                                                                        <div className='d-flex justify-content-around bd-highlight mb-3' style={{ margin: "-10px 0px 0px -10px", color: "gray" }}>
                                                                            <h6 className='p-2 bd-highlight'>Ngày tạo</h6>
                                                                            <h6 className='p-2 bd-highlight'>Hiệu lực</h6>
                                                                            <h6 className='p-2 bd-highlight'>Người tạo</h6>
                                                                        </div>
                                                                        <div className='d-flex justify-content-around bd-highlight ' style={{ margin: "-22px 0px -5px -5px" }} >
                                                                            <h6 className='p-2 bd-highlight'>
                                                                                {item.CreationDate}
                                                                            </h6>
                                                                            <h6 className='p-2 bd-highlight'>
                                                                                {item.Availabilty}
                                                                            </h6>
                                                                            <h6 className='p-2 bd-highlight'>
                                                                                {item.CreatedBy}
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    //IsRead
                                                                    <div style={{ border: '0.4px solid rgba(128, 128, 128, 0.514) ', margin: '15px', borderRadius: "4px", backgroundColor: ' rgba(255, 253, 253, 0.918)', opacity: '0.8' }}>
                                                                        <div key={item.AnnoncementId} className='d-flex flex-row justify-content-between  p-3' >

                                                                            <div className="text-center" style={{ width: '50px' }} >
                                                                                {/* <Avatar image={item.Thumbnail} label="P" size="large" className="mr-2" shape="circle" style={{ backgroundColor: 'rgba(128, 128, 128, 0.514)' }} /> */}
                                                                                <Avatar image='/images/Loa.jpg' label="P" size="large" className="mr-2" shape="circle" style={{ backgroundColor: 'rgba(128, 128, 128, 0.514)' }} />
                                                                            </div>

                                                                            <div className='d-flex flex-column flex-grow-1 '  >
                                                                                <span >
                                                                                    {item.DetailedTitle}
                                                                                </span>

                                                                            </div>
                                                                            <div className='d-flex flex-row'>
                                                                                {(!item.IsRead == false) ?
                                                                                    // <MdOutlineMarkChatRead onClick={() => handleSetReadAnnoucements(item)} className='iconread-notionbar'></MdOutlineMarkChatRead>
                                                                                    <i onClick={() => handleSetReadAnnoucements(item)} style={{ color: "#3333", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open"></i>
                                                                                    :
                                                                                    // <MdOutlineMarkChatUnread onClick={() => handleSetUnReadAnnoucements(item)} className='iconread-notionbar'></MdOutlineMarkChatUnread>
                                                                                    <i style={{ color: "black", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open" onClick={() => handleSetUnReadAnnoucements(item)}></i>
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                        <hr />
                                                                        <div className='d-flex justify-content-around bd-highlight mb-3' style={{ margin: "-10px 0px 0px -10px", color: "gray" }}>
                                                                            <h6 className='p-2 bd-highlight'>Ngày tạo</h6>
                                                                            <h6 className='p-2 bd-highlight'>Hiệu lực</h6>
                                                                            <h6 className='p-2 bd-highlight'>Người tạo</h6>
                                                                        </div>
                                                                        <div className='d-flex justify-content-around bd-highlight ' style={{ margin: "-22px 0px -5px -5px" }} >
                                                                            <h6 className='p-2 bd-highlight'>
                                                                                {item.CreationDate}
                                                                            </h6>
                                                                            <h6 className='p-2 bd-highlight'>
                                                                                {item.Availabilty}
                                                                            </h6>
                                                                            <h6 className='p-2 bd-highlight'>
                                                                                {item.CreatedBy}
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>

                                                    );
                                                })}

                                                {lstNotificationAdmin.AnnouncementItems.length == 0 && 'Không có mục nào để hiển thị'}
                                            </div>
                                        </Card>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Sidebar className='sidebar-header-none' visible={visibleRight1} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} />
                    </>
                }
            </Sidebar>
            {/* {showDetail == true &&
                <LearningDetailNotifition callShow = {(e)=>setshowDetail(e)}/>
            } */}
        </>
    );
}
export default ShowMoreNotification;