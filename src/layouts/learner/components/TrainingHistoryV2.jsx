// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "primereact/card";
import { StatisticLearningItem } from "../my-learning/StatisticLearningItem";
import { learnerService } from 'services/learnerService';
//import Slider from "react-slick";
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
import { CourseItemV2 } from '../my-learning/CourseItemV2';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import LearningDetailContainer from '../components/LearningDetailContainer';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';
import { MdSkipNext } from 'react-icons/md';
import { InputText } from 'primereact/inputtext';
import DropdownFilter from '../my-learning/DropdownFilter';
import { traininghistoryService } from "services/traininghistoryService";
import './style/traininghistoryv2.scss'
import 'primeicons/primeicons.css';
import { overViewService } from 'services/overViewService';
import ShareCourse from 'layouts/others/components/ShareCourse';

const LoaderCard = ({ title }) => {
    return (<Card style={{ boxShadow: 'none' }} className='' title={title}><ProgressSpinner className='w-100' style={{ width: '50px', height: '50px' }} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s" /> </Card>)
}
function TrainingHistoryV2(props) {
    const [totalCourse, setTotalCourse] = useState({
        totalOngoingRecords: 0,
        totalNotStartedRecords: 0,
        totalCompletedRecords: 0,
        totalWaitRecords: 0,
        totalExpiredCourse: 0
    });
    const [selectedLearningItem, setSelectedLearningItem] = useState(0);
    const [dataTitle, setdataTitle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visible, setvisible] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [advanceSearch, setAdvanceSearch] = useState({
        WebAppFlag: "W",
        filterBy: "0",
        assignedFilterBy: "",
        pageNumber: 1,
        pageSize: 10,
        searchBy: "",
        sortBy: "RECENT",
        statusBy: "A",

    });
    const [dataOngoingCourse, setdataOngoingCourse] = useState([]);
    const [dataNotStartedCourse, setdataNotStartedCourse] = useState([]);
    const [dataCompletedCourse, setdataCompletedourse] = useState([]);
    const [dataWaitingApproval, setdataWaitingApproval] = useState([]);
    const [dataExpiredCourse, setdataExpiredCourse] = useState([])
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
        //let result = await learnerService.getmylearningsummary();
        let result = await traininghistoryService.gettraininghistorysummary();
        setdataTitle(result.data.learningSummaryItem);
        //setSelectedLearningItem(result.data.learningSummaryItem[0]?.LearningTypeID);
    }
    const onSelectedLearningItem = (value) => {

        setSelectedLearningItem(value);
        setAdvanceSearch({ ...advanceSearch, filterBy: value });

    }
    const filterCourseOld = async (value) => {

        setLoading(true);
        let result = await learnerService.getmylearnings(value);
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
    const filterCourse = async (value) => {
        setLoading(true);
        let resultS = await traininghistoryService.getmytraininghistory(value, "S");
        let resultC = await traininghistoryService.getmytraininghistory(value, "C");
        let resultX = await traininghistoryService.getmytraininghistory(value, "X");
        setdataOngoingCourse(resultS.data.LearningItems);
        setdataCompletedourse(resultC.data.LearningItems);
        setdataExpiredCourse(resultX.data.LearningItems);
        setTotalCourse({
            totalOngoingRecords: resultS.data.totalRecords,
            totalCompletedRecords: resultC.data.totalRecords,
            totalExpiredCourse: resultX.data.totalRecords,

        });
        setLoading(false);
    }
    const progressView = () => {
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
                breakpoint: 600,
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
    function onclickTitle(data) {
        console.log(data)
        setCourseId(data);
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

    function learningRenderItems(list) {
        return (
            list.map((dataItem, index) => {
                return (
                    <CourseItemV2 showExpireDate onClickTitle={(data) => onclickTitle(data)} key={dataItem.CourseID} dataItem={dataItem} openShareDisplay={() => clickShare()} />
                )

            })
        )
    }


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
        // {
        //     value: 'EXPIRY',
        //     text: 'Ngày hết hạn'
        // }
    ]
    const filterStatus = [
        {
            value: '',
            text: 'Tất cả'
        },
        {
            value: '0',
            text: 'Đã chọn'
        },
        {
            value: '1',
            text: 'Đã gán'
        }
    ]
    const onChangeFilter = (item) => {
        setAdvanceSearch({ ...advanceSearch, sortBy: item.value });
    }
    const onChangeFilterStatus = (item) => {
        setAdvanceSearch({ ...advanceSearch, assignedFilterBy: item.value });
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim();
            setAdvanceSearch({ ...advanceSearch, searchBy: newText });
        }
    }
    const [keySearch, setKeysearch] = useState('')
    function onKeySearchChange(text) {
        let newText = text.trim();
        setKeysearch(newText);
        if(newText==''){
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

    return (<>
        <div className="my-learning-container row">
            <div className='left-learning col-sm-12 col-lg-3'>
                <h2 className='fl-heading'>XEM TIẾN ĐỘ</h2>
                <ul className='progress-list pl-0'>
                    {progressView()}
                </ul>
            </div>
            <div className='right-learning col-9'>
                <div className='d-flex ml-2 mr-2 title_learner' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <b style={{ color: 'black', fontSize: '16px' }}>LỊCH SỬ ĐÀO TẠO</b>
                        <span className='bottom-title-learning'></span>
                    </div>
                    <div >
                        <span className='d-flex justify-content-end align-self-center' style={{ marginTop: '1rem' }} >
                            {
                                visible == false ?
                                    <p className='d-flex flex-row border-end' style={{ marginRight: '10px' }}>
                                        <span className='d-flex align-self-center'>
                                            <i className='pi pi-filter' />
                                        </span>
                                        <div style={{ width: '100px' }}>
                                            <DropdownFilter items={filterStatus} onChange={onChangeFilterStatus} />
                                        </div>
                                    </p>
                                    :
                                    ''
                            }
                            {
                                visible == false ?
                                    <p className='d-flex flex-row justify-content-end border-end' style={{ marginRight: '10px' }}>
                                        <span className='d-flex align-self-center'>
                                            BỞI
                                        </span>
                                        <div style={{ width: '100px', marginRight: '15px' }}>
                                            <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                                        </div>
                                    </p>
                                    :
                                    ''
                            }
                            <p className='d-flex flex-row justify-content-end' style={{ marginRight: '10px' }}>
                                <span className="p-inputgroup">
                                    {
                                        visible == true ?
                                            <div className='p-input-icon-right input-style'>
                                                <i className="pi pi-times" 
                                                onClick={() => {
                                                    setvisible(false)
                                                    setAdvanceSearch({ ...advanceSearch, searchBy: '' });
                                                }} 
                                                />
                                                <InputText onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} visible={visible} 
                                                onHide={() => {
                                                    setvisible(false)
                                                    
                                                }} 
                                                placeholder="Nhập tìm kiếm theo Tên / Mô tả / Chủ đề / Từ khoá / Mã khoá học / Nội dung" style={{ width: '100%' }} />
                                            </div>
                                            :
                                            ''
                                    }
                                    {
                                        visible == false ?
                                            <i className=" pi pi-search fa-magnifying-glass align-self-center" type='button' 
                                            onClick={() => {
                                                setvisible(true);
                                                
                                            }} 
                                            style={{ fontSize: '1.3rem' }}></i>
                                            :
                                            ''
                                    }
                                </span>
                            </p>
                        </span>
                    </div>

                </div>

                <LoadingPanel loading={loading} loader={<LoaderCard title={
                    <div className='d-flex flex-row justify-content header-fix'>
                        <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐANG DIỄN RA</span>
                        <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                            <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=S" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalOngoingRecords})</Link>
                        </span>

                    </div>
                } />} >
                    {dataOngoingCourse.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐANG DIỄN RA</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=S" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalOngoingRecords})</Link>
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
                            <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=X" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalNotStartedRecords})</Link>
                        </span>
                    </div>
                } />} >
                    {dataNotStartedCourse.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>CHƯA BẮT ĐẦU</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=X" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalNotStartedRecords})</Link>
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
                            <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=C" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalCompletedRecords})</Link>
                        </span>
                    </div>
                } />} >
                    {dataCompletedCourse.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐÃ HOÀN THÀNH</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=C" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalCompletedRecords})</Link>
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
                        <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐÃ HẾT HẠN</span>
                        <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                            <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=X" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalExpiredCourse})</Link>
                        </span>
                    </div>
                } />} >
                    {dataExpiredCourse.length > 0 &&
                        <Card style={{ boxShadow: 'none ' }} title={
                            <div className='d-flex flex-row justify-content header-fix'>
                                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>ĐÃ HẾT HẠN</span>
                                <span className='d-flex flex-column align-self-center justify-content-end mr-3'>
                                    <Link to={{ pathname: '/learner/training-history-all', search: "?statusBy=X" }} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'>Xem tất cả ({totalCourse.totalExpiredCourse})</Link>
                                </span>
                            </div>} className='mt-4'>

                            <div className='d-flex justify-content-end mr-5'>
                                <Button onClick={() => onSlickPrev('4')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                <Button onClick={() => onSlickNext('4')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                            </div>


                            <div className='d-flex flex-row justify-content-between'>
                                <div className="w-100 card-courseitems">
                                    <Slider ref={slider04} {...settingsCourse} >
                                        {learningRenderItems(dataExpiredCourse)}
                                    </Slider>
                                </div>
                            </div>
                        </Card>}
                </LoadingPanel>
                {dataOngoingCourse.length == 0
                    && dataCompletedCourse.length == 0
                    && dataNotStartedCourse.length == 0 &&
                    dataExpiredCourse.length == 0 ?
                    <Card className='mt-4'>
                        Không có mục nào để hiển thị
                    </Card> : ''}
                <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                    {
                        <React.Fragment>
                            <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                            <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} />
                        </React.Fragment>

                    }
                </Sidebar>
                <ShareCourse dataTree={lstTree} dataFile={dataFile} dataImg={dataImg} visiblefull={showShare} onHide={() => setshowShare(false)}></ShareCourse>

            </div>
        </div>



    </>)
}
export default TrainingHistoryV2;  