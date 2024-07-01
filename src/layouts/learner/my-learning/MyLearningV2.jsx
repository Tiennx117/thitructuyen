// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "primereact/card";
import { StatisticLearningItem } from "./StatisticLearningItem";
import { learnerService } from 'services/learnerService';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
//import  Slider from "react-slick";
import { CourseItemV2 } from './CourseItemV2';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import LearningDetailContainer from '../components/LearningDetailContainer';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';
import { MdSkipNext } from 'react-icons/md';
import { InputText } from 'primereact/inputtext';
import DropdownFilter from './DropdownFilter';
import LearningDetailNotifition from "layouts/learner/components/LearningDetailNotifition";
import './my-learningv2.scss';
// import { AiFillCalendar, AiOutlineCalendar, AiTwotoneCalendar } from 'react-icons/ai'
// import Calendar from './Calender';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { overViewService } from 'services/overViewService';
import ShareCourse from 'layouts/others/components/ShareCourse';
import BannerContainer from '../components/BannerContainer';
import { classNames } from "primereact/utils"
import { useQuery } from "shared/hooks/useQuery";
import { setFilterMenu } from "store/menu/filterMenu";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

const LoaderCard = ({ title }) => {
    return (<Card style={{ boxShadow: 'none' }} className='' title={title}><ProgressSpinner className='w-100' style={{ width: '50px', height: '50px' }} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s" /> </Card>)
}
function MyLearningV2(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [totalCourse, setTotalCourse] = useState({
        totalOngoingRecords: 0,
        totalNotStartedRecords: 0,
        totalCompletedRecords: 0,
        totalWaitRecords: 0
    });

    const filterMenu = useSelector(state => state.filterMenu);
    // console.log('filterMenu', filterMenu);
    const [visibleBanner, setVisibleBanner] = useState(true);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [selectedLearningItem, setSelectedLearningItem] = useState(0);
    const [dataTitle, setdataTitle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [visible, setvisible] = useState(false);
    const [showFilter, setShowFilter] = useState(true);
    const [ismylearning, setismylearning] = useState(true);
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [expandBook, setExpandBook] = useState(false);
    const [expandDoc, setExpandDoc] = useState(false);
    const [advanceSearch, setAdvanceSearch] = useState({
        WebAppFlag: "W",
        filterBy: filterMenu?.filterBy || "0",
        assignedFilterBy: filterMenu?.assignedFilterBy || "",
        pageNumber: 1,
        pageSize: 10,
        searchBy: "",
        sortBy: "RECENT",
        statusBy: "A",
    });

    // if (Object.keys(filterMenu).length > 0){
    //     setAdvanceSearch({ ...advanceSearch, filterBy: filterMenu.filterBy, assignedFilterBy: filterMenu.assignedFilterBy });
    // }

    const [dataOngoingCourse, setdataOngoingCourse] = useState([]);
    const [dataNotStartedCourse, setdataNotStartedCourse] = useState([]);
    const [dataCompletedCourse, setdataCompletedourse] = useState([]);
    const [dataWaitingApproval, setdataWaitingApproval] = useState([]);
    const [showDetail, setshowDetail] = useState(true);
    const slider00 = useRef();
    const slider01 = useRef();
    const slider02 = useRef();
    const slider03 = useRef();
    const slider04 = useRef();
    const slider05 = useRef();

    const [showShare, setshowShare] = useState(false);
    const [lstTree, setlstTree] = useState([]);
    const [dataFile, setdataFile] = useState([]);
    const [dataImg, setdataImg] = useState([]);
    const [titleContent, setTitleContent] = useState('TẤT CẢ HỌC TẬP');
    const clickShare = async () => {
        setshowShare(true);
        let lstTree1 = await overViewService.getsharetreejson();
        let result = await overViewService.getfilecontroldetails();
        let result1 = await overViewService.getfileimgcontroldetails();
        var arrTree = JSON.parse(lstTree1.data.TreeJson);
        printList1(arrTree[0])
        printList(arrTree[0])
        setlstTree(arrTree);
        setdataFile(result);
        setdataImg(result1)
    }

    const getmylearningsummary = async () => {
        let result = await learnerService.getmylearningsummary();
        setdataTitle(result.data.learningSummaryItem);
        //setSelectedLearningItem(result.data.learningSummaryItem[0]?.LearningTypeID);

    }

    const onSelectedLearningItem = (value) => {
        // console.log(value);
        let obj = {
            LearningTypeID: value,
            assignedFilterBy: '0',
            filterBy: null
        };
        // assignedFilterBy
        setSelectedLearningItem(value);
        setTitleContent(dataTitle.filter(x => x.LearningTypeID == value)[0].LearningType);
        if (value == 12) {
            obj.assignedFilterBy = '0';
            obj.filterBy = 99;
            setShowFilter(false);
            setAdvanceSearch({ ...advanceSearch, filterBy: 99, assignedFilterBy: '0' });
        }
        else if (value == 13) {
            obj.assignedFilterBy = '1';
            obj.filterBy = 99;
            setShowFilter(false);
            setAdvanceSearch({ ...advanceSearch, filterBy: 99, assignedFilterBy: '1' });
        }
        else {
            obj.assignedFilterBy = '';
            obj.filterBy = value;
            setShowFilter(true);
            setAdvanceSearch({ ...advanceSearch, filterBy: value, assignedFilterBy: '' });
        }
        dispatch(setFilterMenu(obj));
    }

    const filterCourse = async (value) => {
        if (Object.keys(filterMenu).length > 0) {
            setSelectedLearningItem(filterMenu.LearningTypeID);
        }
        setLoading(true);
        // let result = await learnerService.getmylearnings(value);
        let result = await learnerService.GetMyLearningNew(value);
        let result1 = await learnerService.getpendingforapprovallearnings(value);
        setdataOngoingCourse(result.data.LearningOngoingItems);
        setdataNotStartedCourse(result.data.LearningNotStartedItems);
        setdataCompletedourse(result.data.LearningCompletedItems)
        setdataWaitingApproval(result1.data.LearningItems);
        setTotalCourse({
            totalOngoingRecords: result.data.totalOngoingRecords,
            totalNotStartedRecords: result.data.totalNotStartedRecords,
            totalCompletedRecords: result.data.totalCompletedRecords,
            totalWaitRecords: result1.data.totalRecords
        });
        setLoading(false);
    }

    const progressView = () => {
        // console.log('dataTitle', dataTitle);
        return (
            dataTitle.map((dataItem, index) => {
                return (
                    <StatisticLearningItem
                        onClick={() => onSelectedLearningItem(dataItem?.LearningTypeID)}
                        key={index} title={dataItem?.LearningType}
                        mod={index}
                        total={dataItem?.TotalLearning}
                        percent={dataItem?.Percentage}
                        type={dataItem?.LearningTypeID}
                        active={selectedLearningItem === dataItem.LearningTypeID}
                    />
                )
            })
        )
    }

    let settings = {
        slideIndex: 0,
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    let settingsCourse = {
        slideIndex: 0,
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        infinite: false,
        //variableWidth: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {

                    slidesToShow: 3,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true
                }
            }
        ]
    };

    function closeDetail() {
        setVisibleRight(false);
        filterCourse(advanceSearch);
    }

    const [approvalStatus, setApprovalStatus] = useState(true);
    function onclickTitle(data, isMyLearning) {
        if (isMyLearning == false) {
            setApprovalStatus(false);
        }
        setCourseId(data);
        setActiveIndex1(0);
        switch (data.CourseType) {
            case "T":
                setCourseId(data.ILTID);
                setCourseType(data.CourseType);
                break;
            default:
                setCourseId(data.ILTID);
                setCourseType(data.CourseType);
        }
        setVisibleRight(true);
    }

    //Bấm sao từ courseItem nhảy vào màn hình đánh giá
    const [isRated, setIsRated] = useState(false);
    const [courseLauchID, setCourseLauchID] = useState(0);
    function openRating(data) {
        setActiveIndex1(1);
        setCourseType(data.CourseType);
        setCourseLauchID(data.CourseLaunchId);
        setIsRated(data.IsRated);
        setVisibleRight(true);
    }


    function learningRenderItems(list, pheduyet) {
        if (pheduyet == false) {
            return (
                list.map((dataItem, index) => {
                    return (
                        // <CourseItemV2 onClickTitle={(data) => onclickTitle(data)} key={dataItem.CourseID} dataItem={dataItem} openShareDisplay={() => clickShare()} openRatingDisplay={(data) => openRating(data)} />
                        <CourseItemV2 ismylearning={ismylearning} onClickTitle={(data) => onclickTitle(data, pheduyet)} key={dataItem.CourseID} dataItem={dataItem} openShareDisplay={() => clickShare()} />
                    )
                })
            )
        } else {
            return (
                list.map((dataItem, index) => {
                    return (
                        // <CourseItemV2 onClickTitle={(data) => onclickTitle(data)} key={dataItem.CourseID} dataItem={dataItem} openShareDisplay={() => clickShare()} openRatingDisplay={(data) => openRating(data)} />
                        <CourseItemV2 ismylearning={ismylearning} onClickTitle={(data) => onclickTitle(data)} key={dataItem.CourseID} dataItem={dataItem} openShareDisplay={() => clickShare()} />
                    )
                })
            )
        }

    }


    // calender
    const clickOpenCalender = () => {
        setVisibleFullScreen(true)
    }
    //end calender

    useEffect(() => {
        // call api here
        getmylearningsummary();
    }, []);


    useEffect(() => {
        filterCourse(advanceSearch);
    }, [advanceSearch]);

    const filterItems = [
        {
            value: 'Recent',
            text: 'Gần đây'
        },
        {
            value: 'NAMEASC',
            text: 'A đến Z'
        },
        {
            value: 'NAMEDESC',
            text: 'Z đến A'
        },
        {
            value: 'EXPIRY',
            text: 'Ngày hết hạn'
        }
    ]

    const onChangeFilter = (item) => {
        setAdvanceSearch({ ...advanceSearch, sortBy: item.value });
    }

    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim()
            setAdvanceSearch({ ...advanceSearch, searchBy: newText });
        }
    }

    const [keySearch, setKeysearch] = useState('');
    // const [keySearchOld, setkeySearchOld] = useState('');
    function onKeySearchChange(text) {
        let newText = text.trim();
        // setkeySearchOld(text)
        setKeysearch(newText);
        if (newText == '') {
            setAdvanceSearch({ ...advanceSearch, searchBy: newText });
        }
    }

    function onSlickNext(slidId) {
        switch (slidId) {
            case '0': slider00.current.slickNext(); break;
            case '1': slider01.current.slickNext(); break;
            case '2': slider02.current.slickNext(); break;
            case '3': slider03.current.slickNext(); break;
            case '4': slider04.current.slickNext(); break;
            default:
        }
    }

    function onSlickPrev(slidId) {
        switch (slidId) {
            case '0': slider00.current.slickPrev(); break;
            case '1': slider01.current.slickPrev(); break;
            case '2': slider02.current.slickPrev(); break;
            case '3': slider03.current.slickPrev(); break;
            case '4': slider04.current.slickPrev(); break;
            default:
        }
    }
    const filterStatus = [
        {
            value: '',
            text: 'Tất cả'
        },
        {
            value: '0',
            text: 'Tự do'
        },
        {
            value: '1',
            text: 'Theo lớp'
        }
    ]
    const onChangeFilterStatus = (item) => {
        setAdvanceSearch({ ...advanceSearch, assignedFilterBy: item.value });
    }

    const closeSearchText = () => {
        setvisible(false)
        setAdvanceSearch({ ...advanceSearch, searchBy: '' });
    }

    useEffect(() => {
        // Sử dụng setTimeout để đặt hành động sau 5 giây
        const timeout = setTimeout(() => {
            setVisibleBanner(false);
        }, 5000);

        // Xóa timeout khi component unmount
        return () => clearTimeout(timeout);
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component mount

    const tabSelected =
        <div className="progress-list-course nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <div className='align-items-center' onClick={() => {
                setExpandDoc(false)
                setExpandBook(false)

                setKeysearch('')
                setValue('')//hiển thị text ở thanh search
                onResetFilter() //reset filterItem
                loadApi(defaultFilter)
                navigate('/learner/catalogue')
            }}>
                <div className={(expandBook == false && expandDoc == false) ? 'canv-name text-left-menu-active' : 'canv-name text-left-menu'} style={{ padding: '12px' }}>
                    TỔNG QUAN HỌC TẬP
                </div>
                <div id='left-learning' className='left-learning left-learning-mobile'>
                    <ul style={{ margin: '0px', paddingTop: '10px' }}>
                        {
                            dataTitle.map((dataItem, index) => {
                                return (
                                    <li>
                                        <div className={classNames('canv-name', 'hand-cursor', selectedLearningItem === dataItem.LearningTypeID ? 'active' : '')} onClick={() => onSelectedLearningItem(dataItem?.LearningTypeID)}>{dataItem?.LearningType} <span>({dataItem?.TotalLearning})</span></div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>



    const openLeftMenu = () => {
        let overlayElement = document.getElementById('overlayMyLearning').style.display;
        let leftElement = document.getElementById('myLearning-left-learning-id').style.display;
        document.getElementById('overlayMyLearning').style.display = (overlayElement == '' || overlayElement == 'none') ? 'block' : 'none';
        document.getElementById('myLearning-left-learning-id').style.display = (leftElement == '' || leftElement == 'none') ? 'block' : 'none';
    }

    return (<>
        {/* <Sidebar className='sidebar-header-none' visible={visibleBanner} onHide={() => setVisibleBanner(false)} position='center' style={{ width: '70%' }}>
            {
                <React.Fragment>
                    <BannerContainer onClose={() => setVisibleBanner(false)} />
                </React.Fragment>
            }
        </Sidebar> */}
        {/* <ShowModal item={dataBanner} isShowModal={isShowModal}></ShowModal> */}

        <div className="my-learning-container myLearning row">
            <div className='myLearning-left-learning-icon' onClick={() => { openLeftMenu() }}>
                <i className='pi pi-align-left' style={{ marginRight: '-10px' }} />
            </div>
            <div id='myLearning-left-learning-id' className="left-learning col-3 scroll-wrapper left-learning-responsive" style={{ backgroundColor: '#E5E5E5' }}>
                {tabSelected}
            </div>

            <div id='left-learning' className='left-learning col-sm-12 col-lg-3'>
                <h2 className='fl-heading'>TỔNG QUAN HỌC TẬP</h2>
                <ul className='progress-list pl-0'>
                    {progressView()}
                </ul>
            </div>

            <div className='right-learning col-9'>
                <div className='d-flex ml-4 mr-2 title_learner' style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-10px' }}>
                    <div className='' style={{ position: 'relative', marginTop: '-4px' }}>
                        <b style={{ color: 'black', fontSize: '16px', textTransform: 'uppercase' }}>{titleContent}</b>
                        <span className='bottom-title-learning'></span>
                    </div>
                    <div className='filter_learner'>
                        <span className='d-flex justify-content-end' style={{ marginTop: '10px' }} >
                            {
                                (visible == false && showFilter) ?
                                    <p className='d-flex flex-row border-end' style={{ marginRight: '10px', alignItems: 'center' }}>
                                        <span className='d-flex align-self-center'>
                                            <i className='pi pi-filter' style={{}} />
                                        </span>
                                        <div style={{ width: '110px' }}>
                                            <DropdownFilter items={filterStatus} onChange={onChangeFilterStatus} />
                                        </div>
                                    </p>
                                    :
                                    ''
                            }
                            {
                                visible == false ?
                                    <>

                                        <p className='d-flex flex-row justify-content-end border-end' style={{ marginRight: '10px' }}>
                                            <span className='d-flex align-self-center' style={{ marginRight: '-10px', }}>
                                                BỞI
                                            </span>
                                            <div style={{ width: '100px', marginRight: '15px' }}>
                                                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                                            </div>
                                        </p>

                                        <p className='border-end'>
                                            <div style={{ fontSize: "20px", cursor: "pointer", marginRight: '10px' }}>
                                                <Link to={{ pathname: '/learner/calender' }}><i className="fa fa-calendar" aria-hidden="true"></i></Link>
                                            </div>
                                        </p>
                                    </>

                                    :
                                    ''
                            }
                            <p className='d-flex flex-row justify-content-end' style={{ marginRight: '10px' }}>
                                <span className="p-inputgroup">
                                    {
                                        visible == true ?
                                            <div className='p-input-icon-right input-style'>
                                                <i className="pi pi-times" onClick={() => closeSearchText()} />
                                                {/* value={keySearchOld} */}
                                                <InputText autoFocus onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} visible={visible} onHide={() => setvisible(false)} placeholder="Nhập tìm kiếm theo Tên / Mô tả / Chủ đề / Từ khoá / Mã khoá học / Nội dung" style={{ width: '100%' }} />
                                            </div>
                                            :
                                            ''
                                    }
                                    {
                                        visible == false ?
                                            <i className="ml-2 fa-sharp fa-solid fa-magnifying-glass align-self-center" type='button' style={{ fontSize: '16px' }} onClick={() => setvisible(true)}></i>
                                            :
                                            ''
                                    }
                                </span>
                            </p>
                        </span>
                    </div>

                </div>

                <LoadingPanel loading={loading} loader={<LoaderCard title={//copy từ title của Card 
                    <div className='d-flex flex-row justify-content-between header-fix'>
                        <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐANG DIỄN RA</span>
                        <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                            <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=S" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả({totalCourse.totalOngoingRecords})</Link>
                        </span>
                    </div>}
                />} >
                    {dataOngoingCourse.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content-between header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐANG DIỄN RA</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=S&assignedFilterBy=" + advanceSearch.assignedFilterBy + "&filterBy=" + advanceSearch.filterBy }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả({totalCourse.totalOngoingRecords})</Link>
                                </span>
                            </div>} className=''>
                            <div className='d-flex justify-content-end mr-5'>
                                <Button onClick={() => onSlickPrev('1')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                <Button onClick={() => onSlickNext('1')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <div className="w-100 card-courseitems">
                                    <Slider ref={slider01} {...settingsCourse} >
                                        {learningRenderItems(dataOngoingCourse)}
                                    </Slider>
                                </div>
                            </div>
                        </Card>}
                </LoadingPanel>
                <LoadingPanel loading={loading} loader={<LoaderCard title={
                    <div className='d-flex flex-row justify-content header-fix'>
                        <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>CHƯA BẮT ĐẦU</span>
                        <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                            <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=N" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalNotStartedRecords})</Link>
                        </span>
                    </div>
                } />} >
                    {dataNotStartedCourse.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>CHƯA BẮT ĐẦU</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=N&assignedFilterBy=" + advanceSearch.assignedFilterBy + "&filterBy=" + advanceSearch.filterBy }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalNotStartedRecords})</Link>
                                </span>
                            </div>} className='mt-4'>
                            <div className='d-flex justify-content-end mr-5'>
                                <Button onClick={() => onSlickPrev('2')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                <Button onClick={() => onSlickNext('2')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <div className="w-100 card-courseitems">
                                    <Slider ref={slider02} {...settingsCourse} >
                                        {learningRenderItems(dataNotStartedCourse)}
                                    </Slider>
                                </div>
                            </div>
                        </Card>}
                </LoadingPanel>
                <LoadingPanel loading={loading} loader={<LoaderCard title={
                    <div className='d-flex flex-row justify-content header-fix'>
                        <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐÃ HOÀN THÀNH</span>
                        <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                            <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=C" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalCompletedRecords})</Link>
                        </span>
                    </div>
                } />} >
                    {dataCompletedCourse.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐÃ HOÀN THÀNH</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=C&assignedFilterBy=" + advanceSearch.assignedFilterBy + "&filterBy=" + advanceSearch.filterBy }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalCompletedRecords})</Link>
                                </span>
                            </div>} className='mt-4'>
                            <div className='d-flex justify-content-end mr-5'>
                                <Button onClick={() => onSlickPrev('3')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                <Button onClick={() => onSlickNext('3')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <div className="w-100 card-courseitems">
                                    <Slider ref={slider03} {...settingsCourse} >
                                        {learningRenderItems(dataCompletedCourse)}
                                    </Slider>
                                </div>
                            </div>
                        </Card>}
                </LoadingPanel>
                <LoadingPanel loading={loading} loader={<LoaderCard title={
                    <div className='d-flex flex-row justify-content header-fix'>
                        <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐANG CHỜ PHÊ DUYỆT</span>
                        <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                            <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=P" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalWaitRecords})</Link>
                        </span>
                    </div>
                } />} >
                    {dataWaitingApproval.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐANG CHỜ PHÊ DUYỆT</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/my-learning-all', search: "?statusBy=P&assignedFilterBy=" + advanceSearch.assignedFilterBy + "&filterBy=" + advanceSearch.filterBy }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalWaitRecords})</Link>
                                </span>
                            </div>} className='mt-4'>
                            <div className='d-flex justify-content-end mr-5'>
                                <Button onClick={() => onSlickPrev('4')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                <Button onClick={() => onSlickNext('4')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <div className="w-100 card-courseitems">
                                    <Slider ref={slider04} {...settingsCourse} >
                                        {learningRenderItems(dataWaitingApproval, false)}
                                    </Slider>
                                </div>
                            </div>
                        </Card>}
                </LoadingPanel>
                {dataOngoingCourse.length == 0
                    && dataCompletedCourse.length == 0
                    && dataNotStartedCourse.length == 0 &&
                    dataWaitingApproval.length == 0 ?
                    <Card className='mt-4'>
                        Không có mục nào để hiển thị
                    </Card> : ''}
                <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                    {
                        <React.Fragment>
                            <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                            <LearningDetailContainer CloseLearningDetailCurrent={() => closeDetail()} isMyLearning={approvalStatus} isFromMyLearning={true} tabIndex={activeIndex1} idCourse={courseId} nameCourseType={courseType} isRated={isRated} courseLauchID={courseLauchID} />
                        </React.Fragment>
                    }
                </Sidebar>
                <ShareCourse dataTree={lstTree} dataFile={dataFile} dataImg={dataImg} visiblefull={showShare} onHide={() => setshowShare(false)}></ShareCourse>
                {/* <Calendar onclickshow={() => setVisibleFullScreen(false)}
                    visiblefull={visibleFullScreen}></Calendar> */}
                <LearningDetailNotifition CloseLearningDetailNotifition={() => closeDetail()} />
            </div>
        </div>

        <div id="overlayMyLearning" onClick={() => {
            document.getElementById("overlayMyLearning").style.display = "none";
            document.getElementById("myLearning-left-learning-id").style.display = "none";
        }}>
        </div>
    </>
    )
}

export default MyLearningV2;  