import { Sidebar } from 'primereact/sidebar';
import React, { useState, useEffect, useRef } from 'react';
import FullCalendar, { greatestDurationDenominator, formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId, dataEven } from '../../demo/components/event-utils'
import { overViewService } from 'services/overViewService';
import { learningService } from 'services/learningService';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import MissionTask from '../../overview/components/MissionTask'
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import './Calender.scss'
import LearningDetailContainer from '../components/LearningDetailContainer';
import { format } from 'date-fns'
import { Card } from 'primereact/card';

const Calender = (props) => {
    const [showmytask, setshowmytask] = useState(true);
    const [countMyTask, setcountMyTask] = useState(0);
    const [countTaskList, setcountTaskList] = useState(1);
    const [courseType, setCourseType] = useState("");
    const [courseId, setCourseId] = useState(0);
    const [visibleRight, setVisibleRight] = useState(false);
    const [weekendsVisible, setweekendsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [currentEvents, setcurrentEvents] = useState([]);
    const [lstMyTask, setlstMyTask] = useState([]);
    const [lstCalender, setlstCalender] = useState([]);
    const [lstCalenderongoing, setlstCalenderongoing] = useState([]);
    let { onclickshow, visiblefull } = props;
    const [search, setsearch] = useState({
        "WebAppFlag": "W",
        filterBy: "",
        "pageNumber": 1,
        "pageSize": 10,
        searchBy: null,
        sortBy: 'RECENT',
        statusBy: 'A'
    });

    const dataTest = [
        { id: 0, start: '2023-02-01', title: 'All-day event' },
        { id: 1, start: '2023-02-01T16:25:00', title: 'Timed event' },
        { id: 2, start: '2023-02-01T16:25:00', title: 'Timed event' },
        { id: 54, start: '2023-02-01T16:25:00', title: 'Timed event' },
        { id: 27, start: '2023-02-01T16:25:00', title: 'Timed event' },
        { id: 25, start: '2023-02-01T16:25:00', title: 'Timed event' },
        { id: 3, start: '2023-02-01T18:25:00', title: 'Timed event' },
        { id: 4, start: '2023-02-01T19:25:00', title: 'Timed event' },
        { id: 5, start: '2023-02-04T19:25:00', title: 'Timed event' },
        { id: 6, start: '2023-02-05T19:25:00', title: 'Timed event' },
        { id: 7, start: '2023-02-07T19:25:00', title: 'Timed event' },
        { id: 8, start: '2023-02-08T19:25:00', title: 'Timed event' },
        { id: 9, start: '2023-02-08T15:25:00', title: 'Timed event' },
    ]
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

    const loadApi = async (val) => {
        let result = await overViewService.getoverviewmytask(val);
        let result1 = await learningService.getmylearningcalender(val);
        let result2 = await learningService.getmylearningcalenderongoing();
        let arrCalender = [];
        for (let i = 0; i < result1.data.length; i++) {
            let a = "";
            let b = "";
            let c = "";
            let d = "";
            let gioBatDau = "";
            let phuBatDau = "";
            result1.data[i].startm = result1.data[i].startm + 1;
            if (result1.data[i].startm >= 10) {
                a = result1.data[i].startm;
            }
            if (result1.data[i].startm < 10) {
                a = "0" + result1.data[i].startm;
            }
            if (result1.data[i].startd >= 10) {
                b = result1.data[i].startd;
            }
            if (result1.data[i].startd < 10) {
                b = "0" + result1.data[i].startd;
            }
            if (result1.data[i].endm >= 10) {
                c = result1.data[i].startm;
            }
            if (result1.data[i].endm < 10) {
                c = "0" + result1.data[i].startm;
            }
            if (result1.data[i].endd >= 10) {
                d = result1.data[i].startd;
            }
            if (result1.data[i].endd < 10) {
                d = "0" + result1.data[i].startd;
            }
            // if (result1.data[i].starthh < 10) {
            //     gioBatDau = "0" + result1.data[i].starthh;
            // }
            // if (result1.data[i].starthh >= 10) {
            //     gioBatDau = result1.data[i].starthh;
            // }
            // if (result1.data[i].startmin < 10) {
            //     phuBatDau = "0" + result1.data[i].startmin;
            // }
            // if (result1.data[i].startmin >= 10) {
            //     phuBatDau = result1.data[i].startmin;
            // }
            result1.data[i].start = result1.data[i].starty + "-" + a + "-" + b;
            result1.data[i].end = result1.data[i].endy + "-" + c + "-" + d;
            // result1.data[i].start = result1.data[i].starty + "-" + a + "-" + b + 'T' + gioBatDau + ":" + phuBatDau + ':00';
            result1.data[i].end = result1.data[i].start
            arrCalender.push(result1.data[i]);
        }
        setlstMyTask(result.data);
        setcountTaskList(result.data.MyTaskList.length)
        setlstCalender(arrCalender);
        setlstCalenderongoing(result2.data);
        setcountMyTask(result.data.MyTaskList.length);
        //calendarRef.current.getApi().addEventSource(arrCalender)
    }
    useEffect(() => {
        // call api here
        loadApi(search);

    }, []);
    const refCalendar = useRef(null);
    const renderSidebar = () => {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={weekendsVisible}
                            onChange={() => handleWeekendsToggle()}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>
                        {currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    //click title right
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

    //click title content

    function closeDetail() {
        setVisibleRight(false);
        loadApi(search);
    }
    function handleEvents(events) {
        setcurrentEvents(events)
    }
    function renderContent(x) {
        return (
            <>
                {x && x.map((item, index) => {
                    return (
                        <div key={index}>{item.title}</div>
                    )
                })}
            </>
        )
    }
    const handleEventClick = (clickInfo) => {
        debugger;
        setCourseId(clickInfo.event.id);
        setCourseType(clickInfo.event.extendedProps.coursetype);

        setVisibleRight(true);
    }

    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);

    return (
        <>
            {console.log('lstCalender', lstCalender)}
            {console.log('dataTest', dataTest)}
            <Card>
                <div className=''>
                    <div className='demo-app row'>
                        {/* {this.renderSidebar()} */}
                        <div style={{ width: "100%", height: 'calc(94vh)', overflow: "auto" }} className='demo-app-main col-md-9'>
                            <div style={{ width: "100%", height: "90%", overflow: "auto" }}>
                                <Link to={'/learner/my-learning'} className='fsx-14px'> Quay lại</Link>
                                <FullCalendar
                                    ref={refCalendar}
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, timeGridWeek]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth timeGridWeek timeGridDay'
                                    }}
                                    initialView='dayGridMonth'
                                    // customButtons={{
                                    //     custom1: {
                                    //         text: 'Quay lại',
                                    //         click: function () {
                                    //             window.location.href = '/learner/my-learning'
                                    //         }
                                    //     }
                                    // }}
                                    editable={true}
                                    selectable={true}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    weekends={weekendsVisible}
                                    events={lstCalender}
                                    // select={handleDateSelect}
                                    eventContent={renderEventContent}
                                    eventClick={(handleEventClick)}
                                    eventsSet={() => handleEvents()}
                                    eventTimeFormat={{
                                        hour: "numeric",
                                        minute: "2-digit",
                                        meridiem: "short"
                                    }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>
                                <div style={{ display: "flex" }}>
                                    <span style={{ width: "8px", height: "8px", display: "block", borderRadius: "50%", margin: "4px", backgroundColor: "#989da6" }} ></span>
                                    <span>Đã hết hạn</span>
                                </div>
                                <div style={{ display: "flex", marginLeft: "8px" }}>
                                    <span style={{ width: "8px", height: "8px", display: "block", borderRadius: "50%", margin: "4px", backgroundColor: "#00a651" }} ></span>
                                    <span>Đang tiếp tục</span>
                                </div>
                                <div style={{ display: "flex", marginLeft: "8px" }}>
                                    <span style={{ width: "8px", height: "8px", display: "block", borderRadius: "50%", margin: "4px", backgroundColor: "#f36464" }} ></span>
                                    <span>Sắp tới hạn</span>
                                </div>
                                <div style={{ display: "flex", marginLeft: "8px" }}>
                                    <span style={{ width: "8px", height: "8px", display: "block", borderRadius: "50%", margin: "4px", backgroundColor: "#23b7e5" }} ></span>
                                    <span>Sắp bắt đầu</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3' style={{ width: "100%", height: 'calc(94vh)', overflow: "auto" }}>
                            <div className="p-card" >
                                <div className="p-card-body" >
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div> <h5 className="">Nhiệm vụ của tôi ({countTaskList}) </h5></div>

                                        <span style={{ lineHeight: "20px", textAlign: "center" }}>{format(new Date(), 'PP')}</span>
                                    </div>
                                    <LoadingPanel loading={loading} >
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
                                        <div className="world-round-sec" style={{ textAlign: "center", backgroundColor: "#d7cbcb33" }}>
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
            </Card>
            <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} /></>
                }
            </Sidebar>

        </>
    )
}

const handleWeekendsToggle = () => {
    setweekendsVisible(false)
}

const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
        calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        })
    }
}


function renderEventContent(eventInfo) {
    let classname = eventInfo.event.classNames[0];
    return (
        <>
            <div style={{ display: "flex" }}>
                <span style={{ width: "6px", height: "6px", display: "block", borderRadius: "50%", margin: "4px" }} className={classname}></span>
                <span title={eventInfo.event.title} style={{
                    backgroundColor: eventInfo.backgroundColor, color: "black", borderColor: eventInfo.borderColor,
                    width: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                }}>
                    {eventInfo.event.title}
                </span>
            </div>

        </>
    )
}
function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}

export default Calender;