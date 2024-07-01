import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "primereact/card";
import { StatisticLearningItem } from "../my-learning/StatisticLearningItem";
import { learnerService } from 'services/learnerService';
import Slider from "react-slick";
import { CourseItemV2 } from '../my-learning/CourseItemV2';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import LearningDetailContainer from './LearningDetailContainer';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';
import { MdSkipPrevious } from 'react-icons/md';
import { InputText } from 'primereact/inputtext';
import DropdownFilter from '../my-learning/DropdownFilter';
import { useListState } from 'shared/hooks/useListState';
import { useQuery } from "shared/hooks/useQuery";
import './style/catalogue.scss';

const LoaderCard = ({ title }) => {
    return (<Card className='mt-4 ml-2 mr-2' title={title}><ProgressSpinner className='w-100' style={{ width: '50px', height: '50px' }} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s" /> </Card>)
}
function ViewAllKeySearchLearner(props) {
    let query = useQuery();
    let status = query.get('statusBy');
    let assignedFilterBy = query.get('assignedFilterBy');
    let filterBy = query.get('filterBy');
    let keySearch1 = query.get('keySearch');
    const getTitle = () => {
        switch (status) {
            case 'S':
                return 'ĐANG DIỄN RA';
            case 'N':
                return 'CHƯA BẮT ĐẦU';
            case 'C':
                return 'ĐÃ HOÀN THÀNH';
            case 'P':
                return 'ĐANG CHỜ PHÊ DUYỆT';
            default:
            // code block
        }
    }
    const [learningItems, setLearningItems] = useState([]);
    const [totalCourse, setTotalCourse] = useState({
        totalOngoingRecords: 0,
        totalNotStartedRecords: 0,
        totalCompletedRecords: 0,
        totalWaitRecords: 0
    });
    const [selectedLearningItem, setSelectedLearningItem] = useState(0);
    const [dataTitle, setdataTitle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [title, setTitle] = useListState("");
    const [advanceSearch, setAdvanceSearch] = useState({
        WebAppFlag: "W",
        filterBy: filterBy,
        assignedFilterBy: assignedFilterBy,
        pageNumber: 1,
        pageSize: 10,
        searchBy: null,
        sortBy: "RECENT",
        statusBy: "",
        KeySearch:keySearch1
    });
    const [visibleMore, setVisibleMore] = useState(true);

    const getmylearningsummary = async () => {
        let result = await learnerService.getmylearningsummary();
        setdataTitle(result.data.learningSummaryItem);
        //setSelectedLearningItem(result.data.learningSummaryItem[0]?.LearningTypeID);
    }

    const onSelectedLearningItem = (value) => {
        setSelectedLearningItem(value);
        setAdvanceSearch({ ...advanceSearch, filterBy: value });
    }

    const filterCourse = async (value) => {
        setLoading(true);
        let result = await learnerService.GetKeySearchAllMyLearnings(value);

        handlers.setState(result.data.LearningItems);

        let result1 = await learnerService.getpendingforapprovallearnings(value);
        if (status == "P") {
            handlers.setState(result1.data.LearningItems);
        }
        setTotalCourse({
            totalOngoingRecords: result.data.totalOngoingRecords,
            totalNotStartedRecords: result.data.totalNotStartedRecords,
            totalCompletedRecords: result.data.totalCompletedRecords,
            totalWaitRecords: result1.data.totalRecords
        });
        debugger
        // if (status == "S" || status == "N" || status == "C") {
        //     if (result.data.totalRecords > result.data.pageSize) {
        //         setVisibleMore(true);
        //     }
        //     if (result.data.totalRecords <= result.data.pageSize || result.data.pageNumber * result.data.pageSize >= result.data.totalRecords) {
        //         setVisibleMore(false);
        //     }
        // } else if (status == "P") {
        //     if (result1.data.totalRecords > result1.data.pageSize) {
        //         setVisibleMore(true);
        //     }
        //     if (result1.data.totalRecords <= result1.data.pageSize || result1.data.pageNumber * result1.data.pageSize >= result1.data.totalRecords) {
        //         setVisibleMore(false);
        //     }
        // }
        if (result1.data.totalRecords > result1.data.pageSize) {
            setVisibleMore(true);
        }
        if (result1.data.totalRecords <= result1.data.pageSize || result1.data.pageNumber * result1.data.pageSize >= result1.data.totalRecords) {
            setVisibleMore(false);
        }
        console.log('totalRecords', result.data.totalRecords);
        console.log('pageSize', result.data.pageSize);
        console.log('pageNumber', result.data.pageNumber);
        console.log('visibleMore', visibleMore);

        setLoading(false);
    }

    function closeDetail() {
        setVisibleRight(false);
        filterCourse(advanceSearch);
    }

    function onclickTitle(data) {
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
                    <CourseItemV2 ismylearning={true} onClickTitle={(data) => onclickTitle(data)} key={index} dataItem={dataItem} />
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
        {
            value: 'EXPIRY',
            text: 'Ngày hết hạn'
        }
    ]

    const onChangeFilter = (item) => {
        setAdvanceSearch({ ...advanceSearch, sortBy: item.value });
        filter.pageNumber = 1;
    }

    function keyDown(e) {
        if (e.key == 'Enter') {
            let result = e.target.value.trim()
            setAdvanceSearch({ ...advanceSearch, searchBy: result });
        }
        filter.pageNumber = 1;
    }

    const [keySearch, setKeysearch] = useState('')
    function onKeySearchChange(text) {
        let result = text.trim();
        setKeysearch(result);
        filter.pageNumber = 1;
    }

    const body = {
        "assignedFilterBy": "",
        "filterBy": "0",
        "pageNumber": 1,
        "pageSize": 10,
        "searchBy": null,
        "sortBy": "RECENT",
        "statusBy": status,
    }

    const [filter, setFilter] = useState({
        ...body
    });
    const [courses, handlers] = useListState([]);
    const [loadingLoadmore, setLoadingLoadmore] = useState(false);

    const onShowMore = async () => {
        setLoadingLoadmore(true);
        filter.pageNumber++;
        filter.searchBy = keySearch;
        let result = await learnerService.getviewallmylearnings(filter);

        setFilter(filter);

        if (result.data.LearningItems.length > 0) {
            result.data.LearningItems.forEach(element => {
                handlers.append(element);
            });
        }

        if (status == "S" || status == "N" || status == "C") {
            if (result.data.totalRecords <= result.data.pageSize || result.data.pageNumber * result.data.pageSize >= result.data.totalRecords) {
                setVisibleMore(false);
            }
        } else if (status == "P") {
            if (result.data.totalRecords <= result.data.pageSize || result.data.pageNumber * result.data.pageSize >= result.data.totalRecords) {
                setVisibleMore(false);
            }
        }

        setLoadingLoadmore(false);
    }

    const [visibleSearch, setVisibleSearch] = useState(false);

    return (
        <>
            <div className="my-learning-container mt-2" style={{ backgroundColor: 'white' }}>
                <div className='d-flex justify-content-between'>
                    <div style={{ position: 'relative', marginLeft: '2rem', marginTop: '10px' }}>
                        <b className='font-size-tieude' style={{ color: 'black', marginTop: '1rem' }}>{keySearch1}</b>
                        <span className='bottom-title-learning'></span>
                    </div>
                    <span className='d-flex justify-content-end' >
                        {
                            visibleSearch == false ?
                                <p className='d-flex flex-row justify-content-end border-end' style={{ marginRight: '10px', marginTop: '10px' }}>
                                    <span className='font-size-tieude d-flex align-self-center'>
                                        BỞI
                                    </span>
                                    <div style={{ width: '100px', marginRight: '15px' }}>
                                        <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                                    </div>
                                </p>
                                :
                                ''
                        }

                        <p className='d-flex flex-row justify-content-end' style={{ marginRight: '10px', marginTop: '10px' }}>
                            <span className="p-inputgroup">
                                {
                                    visibleSearch == true ?
                                        <div className='p-input-icon-right'>
                                            <i className="pi pi-times" onClick={() => setVisibleSearch(false)} />
                                            <InputText className='search-all' onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} visible={visibleSearch} onHide={() => setVisibleSearch(false)} placeholder="Nhập tìm kiếm theo Tên / Mô tả / Chủ đề / Từ khoá / Mã khoá học" />
                                        </div>
                                        :
                                        ''
                                }
                                {
                                    visibleSearch == false ?
                                        <i className=" fa-sharp fa-solid fa-magnifying-glass align-self-center mr-2" type='button' onClick={() => setVisibleSearch(true)}></i>
                                        :
                                        ''
                                }
                            </span>
                        </p>
                    </span>
                </div>
                {courses.length > 0 &&
                    <LoadingPanel loading={loading} >
                        <Card style={{ boxShadow: 'none',height: 'calc(100vh - 300px)' }} 
                        title=
                            {
                                <div className='d-flex flex-row justify-content-between header-fix' >
                                    <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12 }}>{getTitle()}</span>
                                    <span className='d-flex flex-column align-self-center justify-content-end mr-3' >
                                        <Link style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'></Link>
                                        
                                    </span>
                                </div>
                            }
                            className='ml-2 mr-2 overflow-y-auto card-small-device' >
                            <div className="d-flex flex-row justify-content-start flex-wrap" style={{ flexWrap: 'wrap !important', marginLeft:'30px' }}>
                                {learningRenderItems(courses)}
                            </div>
                            {
                                visibleMore &&
                                <div className="d-flex justify-content-end" style={{ right: '20px', left: '20px' }}>
                                    <Button className='btn-showmore' label="Xem nhiều hơn" loading={loadingLoadmore} onClick={onShowMore} style={{ backgroundColor: 'white', color: '#1aa1dc', borderColor: 'white' }} />
                                </div>
                            }
                        </Card>
                    </LoadingPanel>
                }
                <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                    {
                        <React.Fragment>
                            <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                            <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} />
                        </React.Fragment>
                    }
                </Sidebar>
            </div>
        </>
    )
}
export default ViewAllKeySearchLearner;