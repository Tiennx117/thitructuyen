import { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';
import { notificationService } from 'services/notificationService';
import { classNames } from 'primereact/utils';
import { MdOutlineMarkChatRead, MdOutlineMarkChatUnread } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import './NotionBar.scss';
import axios from 'axios';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import DropdownFilter from 'layouts/learner/my-learning/DropdownFilter';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import LearningDetailContainer from '../learner/components/LearningDetailContainer';
import { learningService } from 'services/learningService';

const NotionBar = () => {
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
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleRight1, setVisibleRight1] = useState(false);
    const [dataNotification, setDataNotification] = useState(defaultNotification);
    const [dataAnnouncements, setAnnouncements] = useState(defaultAnnouncements);

    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = useState("");
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");

    const show = () => {
        setVisibleRight(true);
        notificationService.getnotificationlist().then(res => {
            setDataNotification(res.data);
        })
    }

    const onChangeTab = async (e) => {
        if (e.index === 1) {
            let result = await notificationService.getPublicAnnouncements();
            setAnnouncements(result.data);
        }
    }

    const handleDelete = async (item) => {
        let result = await notificationService.deleteNotification(item.NotificationId);
        //setDeleted(true);
        setLoading(true);
        //setDeleted(false);
        notificationService.getnotificationlist().then(res => {
            setDataNotification(res.data);
        })
        setLoading(false);
    }

    const handleSetUnRead = async (item) => {
        setDataNotification(data => {
            let temp = Object.assign({}, data)
            let obj = temp.NotificationItems.find(x => x.NotificationId == item.NotificationId);
            let index = temp.NotificationItems.indexOf(obj);
            temp.NotificationItems[index].IsRead = true;
            data = temp;
            return data;
        });
        item.IsRead = true;
        let result = await notificationService.setReadNotification(item.NotificationId);
        notificationService.getnotificationlist().then(res => {
            setDataNotification(res.data);

        })
        let result1 = await notificationService.gettotalnotificationcount();
        setTotal(result1.data.TotalNotification);
    }

    // Announcements
    const handleSetReadAnnoucements = (item) => {
        setAnnouncements(data => {
            let temp = Object.assign({}, data)
            let obj = temp.AnnouncementItems.find(x => x.AnnoncementId == item.AnnoncementId);
            let index = temp.AnnouncementItems.indexOf(obj);
            temp.AnnouncementItems[index].IsRead = false;
            data = temp;
            return data;
        });
        item.IsRead = false;
    }

    const handleSetUnReadAnnoucements = async (item) => {
        setAnnouncements(data => {
            let temp = Object.assign({}, data)
            let obj = temp.AnnouncementItems.find(x => x.AnnoncementId == item.AnnoncementId);
            let index = temp.AnnouncementItems.indexOf(obj);
            temp.AnnouncementItems[index].IsRead = true;
            data = temp;
            return data;
        });
        item.IsRead = true;
        let result = await notificationService.setReadAnnouncements(item.AnnoncementId);
    }

    const [filter, setFilter] = useState({
        "NotificationIds": null,
        "PageNumber": 1,
        "PageSize": 10,
        "OrderBy": "",
    });

    const [filter2, setFilter2] = useState({
        "AnnoncementId": null,
        "PageNumber": 1,
        "PageSize": 10,
        "OrderBy": "",
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

    const showMoreNoti = () => {
        setVisibleRight(false)
    }
    const onChangeFilter = async (item) => {
        filter.OrderBy = item.value;
        setFilter(filter);
        setLoading(true);
        let result = await notificationService.getnotificationlist(filter);
        setDataNotification(result.data);
        setLoading(false);
    }

    const onChangeFilter2 = async (item) => {
        filter2.OrderBy = item.value;
        setFilter2(filter2);
        setLoading(true);
        let result = await notificationService.getPublicAnnouncements(filter2);
        setAnnouncements(result.data);
        setLoading(false);
    }

    const [total, setTotal] = useState("");

    const gettotalnotificationcount = async () => {
        let result = await notificationService.gettotalnotificationcount();
        setTotal(result.data.TotalNotification);
    }
    const clickTitle = async (item) => {
        setDataNotification(data => {
            let temp = Object.assign({}, data)
            let obj = temp.NotificationItems.find(x => x.NotificationId == item.NotificationId);
            let index = temp.NotificationItems.indexOf(obj);
            temp.NotificationItems[index].IsRead = true;
            data = temp;
            return data;
        });
        item.IsRead = true;
        let result = await notificationService.setReadNotification(item.NotificationId);
        if (item.ItemType == 'DF') {
            setVisibleRight(false)
        }
    }
    const clickTitleLopHoc = async (it) => {
        //debugger;
        let courseInfo = await learningService.getmylearningdetail(it.ItemId, true);
        const currentTime = new Date();

        var startDateString = courseInfo.data.LearningItem.StartDate;
        var endDateString = courseInfo.data.LearningItem.EndDate;

        if ((startDateString != "-" && parseDate(startDateString) > currentTime) || (endDateString != "-" && parseDate(endDateString) < currentTime)) {
            window.alert("Khóa học không nằm trong khoảng thời gian truy cập.")
        } else {
            setDataNotification(data => {
                let temp = Object.assign({}, data)
                let obj = temp.NotificationItems.find(x => x.NotificationId == it.NotificationId);
                let index = temp.NotificationItems.indexOf(obj);
                temp.NotificationItems[index].IsRead = true;
                data = temp;
                return data;
            });
            it.IsRead = true;
            let result = await notificationService.setReadNotification(it.NotificationId);
            if (it.ItemType == "ILT-DF") {
                setVisibleRight(false)
                setCourseId(it.ItemId);
                setCourseType('T');
                setVisibleRight1(true);
            }
            else {
                setVisibleRight(false)
                setCourseId(it.ItemId);
                setCourseType('C');
                setVisibleRight1(true);
            }
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
    }

    useEffect(() => {
        gettotalnotificationcount();
    }, [])

    return (<>
        <Sidebar className='sidebar-notion' maskStyle={{ padding: 0 }} showCloseIcon={true} style={{ width: '40%', padding: 0 }} visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
            <TabView className='notificationLayout' panelContainerStyle={{ padding: 0 }} onBeforeTabChange={(e) => onChangeTab(e)}>
                <TabPanel contentStyle={{ padding: 0 }} headerStyle={{}} header="Thông báo từ hệ thống">
                    <div className='d-flex flex-column'>
                        <div className='d-flex flex-row justify-content-between m-2 p-2'>
                            <span style={{ lineHeight: "38px" }}>{dataNotification.TotalUnreadRecords} thông báo chưa đọc</span>
                            <div className='dropdown'>
                                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                            </div>
                        </div>
                        <div className="list-group list-group-flush scrollarea ">
                            <div style={{ display: "flex", marginBottom: "16px" }}>
                                <div style={{ marginLeft: "16px", marginRight: "4px", lineHeight: "20px", width: "30%", color: "#a4a8ab " }}>Thông báo cũ hơn</div>
                                {/* <div style={{ width: "100%", borderBottom: "1px solid #a4a8ab6e", marginBottom: "5px" }}></div> */}
                            </div>
                            <div className='border-bottom'></div>
                            <LoadingPanel loading={loading} >
                                {dataNotification.NotificationItems?.map((item, index) => {
                                    return (

                                        <div key={index}>
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

                                                        <span className={classNames({ '': !item.IsRead, 'opacity-50': item.IsRead })} style={{ fontSize: '12px', fontWeight: '650' }}>
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
                                                                // <MdOutlineMarkChatUnread onClick={() => handleSetUnRead(item)} className='iconread-notionbar'></MdOutlineMarkChatUnread>
                                                                <i style={{ lineHeight: '23px', fontSize: '12px', color: "black", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open" onClick={() => handleSetUnRead(item)}></i>

                                                                :
                                                                <i style={{ lineHeight: '23px', fontSize: '12px', color: "#3333", width: "20px", height: "20px", margin: "10px", cursor: "pointer" }} className="fa-solid fa-book-open"></i>
                                                            // <MdOutlineMarkChatRead className='iconread-notionbar'></MdOutlineMarkChatRead>
                                                        }


                                                        <BiTrash onClick={() => handleDelete(item)} className='icondelete-notionbar'></BiTrash>
                                                    </div>
                                                </div>
                                                <br></br>
                                            </div>
                                        </div>
                                    )
                                })}
                                <Link className="nav-link" to={'showmorenotification'}>
                                    <button style={{ backgroundColor: "white", color: "black", border: "1px solid #333", borderRadius: "25px" }} onClick={() => showMoreNoti()}>Xem thêm</button>
                                </Link>
                            </LoadingPanel>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel headerStyle={{}} header="Thông báo từ quản trị">
                    <div className='d-flex flex-column'>
                        <div className='d-flex flex-row justify-content-between m-2 p-2'>
                            <span style={{ lineHeight: "38px" }}>{dataAnnouncements.TotalUnreadRecords} thông báo chưa đọc</span>
                            <div className='dropdown'>
                                <DropdownFilter items={filterItems} onChange={onChangeFilter2} />
                            </div>
                        </div>
                        <div style={{ display: "flex", marginBottom: "16px" }}>
                            <div style={{ marginLeft: "16px", marginRight: "4px", lineHeight: "20px", width: "30%", color: "#a4a8ab " }}>Thông báo cũ hơn</div>
                            {/* <div style={{ width: "100%", borderBottom: "1px solid #a4a8ab6e", marginBottom: "5px" }}></div> */}
                        </div>
                        <div className="list-group list-group-flush scrollarea ">
                            <div className='border-bottom'></div>
                            {dataAnnouncements.AnnouncementItems?.map((item, index) => {
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
                                                            <span className={classNames({ 'fw-bold': !item.IsRead })} style={{ margin: "5px 0px 15px 0px" }}>
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
                                                            <span className={classNames({ 'fw-bold': !item.IsRead })} style={{ margin: "5px 0px 15px 0px" }}>
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
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </Sidebar>

        <i onClick={() => show()} className="pi pi-bell mr-3 p-text-secondary p-overlay-badge cursor-pointer" style={{ fontSize: '1.3rem', color: 'white' }}><Badge size='normal' severity="danger" value={total} ></Badge></i>

        <Sidebar className='sidebar-header-none' visible={visibleRight1} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
            {
                <>
                    <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                    <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} />
                </>
            }
        </Sidebar>
    </>)
}
export default NotionBar;
