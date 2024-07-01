import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'components/Image';
import { TabView, TabPanel } from 'primereact/tabview';
import { learningService } from 'services/learningService';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from './LearningDetailContainer';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import './style/featuredCourse.scss';
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
// import 'primeicons/primeicons.css';
import { useLocation } from 'react-router-dom';

const FeaturedCourseContainer = (props) => {
    const [activeTab, setActiveTab] = useState(0);
    const [lstName, setlstName] = useState([]);
    const location = useLocation();
    // const [imgWidthDF, setimgWidthDF] = useState(900)
    const [indexImg, setIndexImg] = useState(0)
    const [courseLauchID, setCourseLauchID] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState(true);
    const [visibleRight, setVisibleRight] = useState(false);
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dataLearning, setdataLearning] = useState([]);
    const [dataCourse, setdataCourse] = useState([]);
    const [dataCourseV1, setdataCourseV1] = useState([]);
    const [courseId, setCourseId] = useState(0);
    const [featuredId, setFeaturedId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [visibleMore, setVisibleMore] = useState(false);
    const [isMyLearning, setIsMyLearning] = useState(true);
    const [dataDetails, setdataDetails] = useState([]);
    const [itemImage, setitemImage] = useState();

    const defaultImg = window.location.origin + "/images/bg1.jpg";
    const handleImageError = (event) => {
        event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
    };
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 20,
        SortBy: "RECENT",
        SeartchText: '',
        SortOrder: 'ASC'
    });
    const [filterBy2, setfilterBy2] = useState({
        PageNumber: 1,
        RecordsPerPage: 4,
        SortBy: "RECENT",
        SeartchText: '',
        SortOrder: 'ASC'
    });
    const loadApi = async (indexImg) => {
        let result = await learningService.getfeaturedcourselearning({ ...filterBy1, PageNumber: 1 });
        var lstNameBanner = [...lstName];
        if (result.data.FeaturedCourseLst.length > 0) {
            result.data.FeaturedCourseLst.forEach(element => {
                lstNameBanner.push(element.NMFeaturedCourse);
            });
            setdataDetails(result.data.FeaturedCourseLst)

            let result1 = await learningService.getfeaturedcoursedetail({ ...filterBy2, PageNumber: 1, IDFeatured: result.data.FeaturedCourseLst[indexImg].IDFeaturedCourse });
            setdataCourse(result1.data?.FeaturedCourseLstDetail)
            if (result1.data?.FeaturedCourseLstDetail.length == filterBy2.RecordsPerPage && result1.data?.FeaturedCourseLstDetail.length < result1.data?.TotalRecords) {
                setVisibleMore(true);
            }
        }
        if (dataCourseV1.length > 0) {
            setdataCourse(dataCourseV1);
        }
        setlstName(lstNameBanner);
        setdataLearning(result.data);
    }
    const loadApi2 = async (indexImg) => {
        let result = await learningService.getfeaturedcourselearning({ ...filterBy1, PageNumber: 1 });
        var lstNameBanner = [...lstName];
        if (result.data.FeaturedCourseLst.length > 0) {
            result.data.FeaturedCourseLst.forEach(element => {
                lstNameBanner.push(element.NMFeaturedCourse);
            });
            setdataDetails(result.data.FeaturedCourseLst)

            let result1 = await learningService.getfeaturedcoursedetail({ ...filterBy2, PageNumber: 1, IDFeatured: result.data.FeaturedCourseLst[indexImg].IDFeaturedCourse });
            setdataCourse(result1.data?.FeaturedCourseLstDetail)
            if (result1.data?.FeaturedCourseLstDetail.length == filterBy2.RecordsPerPage && result1.data?.FeaturedCourseLstDetail.length < result1.data?.TotalRecords) {
                setVisibleMore(true);
            }
            console.log("location.state", location.state)
            if (location.state != null) {
                if (location.state.visible == true) {
                    let index = result.data.FeaturedCourseLst.findIndex(x => x.IDFeaturedCourse == location.state.courseID);
                    setitemImage(index)
                    if (index != -1) {
                        setActiveTab(index);
                        setIndexImg(index);
                        setVisibleMore(false),
                            setfilterBy2({ ...filterBy2, PageNumber: 1 })
                        setdataCourseV1([])
                        // index = null
                        // onTabClick("",index)
                    }
                }
            }

        }
        if (dataCourseV1.length > 0) {
            setdataCourse(dataCourseV1);
        }
        setlstName(lstNameBanner);
        setdataLearning(result.data);
    }
    useEffect(() => {
        loadApi2(indexImg)
    }, [])

    useEffect(() => {
        loadApi(indexImg)
    }, [indexImg])



    const onShowMore = async () => {
        let CrouseTemp;
        filterBy2.PageNumber++;
        setfilterBy2(filterBy2);
        const params = {
            PageNumber: filterBy2.PageNumber,
            RecordsPerPage: filterBy2.RecordsPerPage,
            SortBy: filterBy2.SortBy,
            SeartchText: filterBy2.SeartchText,
            SortOrder: filterBy2.SortOrder
        };
        let result = await learningService.getfeaturedcoursedetail({ ...params, IDFeatured: dataLearning?.FeaturedCourseLst[indexImg].IDFeaturedCourse });
        if (result.data?.FeaturedCourseLstDetail.length > 0) {
            CrouseTemp = [...dataCourse, ...result.data?.FeaturedCourseLstDetail];
            setdataCourse(CrouseTemp);
        }
        if (
            result.data?.FeaturedCourseLstDetail.length < result.data.RecordsPerPage ||
            result.data.PageNumber * result.data.RecordsPerPage >=
            result.data.TotalRecords
        ) {
            setVisibleMore(false);
        }
    };
    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);
    function onclickTitle(data, isMyLearning) {
        setCourseType(data.CourseType);
        setCourseId(data.IDFeaturedCourse);
        setActiveIndex1(0);
        setVisibleRight(true);
        setdataCourseV1(dataCourse);
    }
    const closeDetail = () => {
        setVisibleRight(false);
    }
    // const onTabChange = (e) => {
    //     setActiveIndex(e.index);
    //     setIndexImg(e.index);
    //     setVisibleMore(false),
    //         setfilterBy2({ ...filterBy2, PageNumber: 1 })
    // }

    const onTabClick = (e, index) => {
        setActiveTab(index);
        setIndexImg(index);
        setVisibleMore(false),
            setfilterBy2({ ...filterBy2, PageNumber: 1 })
        setdataCourseV1([])
    };
    const TabScreen = ({ activeTab, idx }) => {
        return (
            <div
                className="animate__animated animate__fadeInLeft"
                role="tabpanel"
            >
                {
                    activeTab === idx &&
                    <div className="BodyItem">
                        {
                            dataCourse?.length > 0 ?
                                dataCourse?.map((item, index) => {
                                    return (
                                        <div className='row' style={{ marginTop: 20 }} key={index}>
                                            <div className='col-3' >
                                                <div style={{ width: '185px', height: '230px', boxShadow: '5px 2px 10px rgba(0, 0, 0, 0.2) ' }}>
                                                    <span style={{ minWidth: '30px', position: 'absolute', background: '#43a24a', color: 'white', padding: '2px 8px' }}>{item.CourseRating || 0} <i className="fa fa-star "></i></span>
                                                    <Image style={{ width: '100%', height: 150 }} src={item.CourseImage}></Image>
                                                    <div onClick={() => onclickTitle(item)}
                                                        style={{ fontWeight: '700', height: 50, fontSize: 13, padding: "8px 6px 0px", cursor: 'pointer', borderTop: "4px solid #999", overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.NMFeaturedCourse}
                                                    </div>
                                                    <div style={{ marginTop: 10, padding: "0 6px 6px", fontSize: 12 }}>{item.TypeName}</div>
                                                </div>
                                            </div>
                                            <div className='col-9' style={{ marginLeft: '-6%' }}>
                                                <div onClick={() => onclickTitle(item)} style={{ fontSize: 18, fontWeight: '700', cursor: 'pointer' }}>{item.NMFeaturedCourse}</div>
                                                <div style={{ padding: 4, marginTop: 4 }}>
                                                    <span ><i className="fas fa-calendar-days" style={{ color: '#1aa1dc', fontSize: 16 }}></i> Ngày bắt đầu: </span>
                                                    <span style={{ fontWeight: '600' }}>{item.StartDate}</span>
                                                </div>
                                                <div style={{ marginTop: 8, padding: "0px 4px" }}>
                                                    <span ><i className="fas fa-clock-rotate-left" style={{ color: '#1aa1dc', fontSize: 16 }}></i> Ngày kết thúc: </span>
                                                    <span style={{ fontWeight: '600' }}>{item.EndDate || "-"}</span>
                                                </div>
                                                <div style={{ marginTop: 8, padding: 4 }}>
                                                    <span ><i className="fas fa-flag cursor-pointer" style={{ color: '#1aa1dc', fontSize: 16 }}></i> Trạng thái: </span>
                                                    <span style={{ fontWeight: '600' }}>{item.Status}</span>
                                                </div>
                                                <div style={{ marginTop: 10 }}>Mô tả: {item.Description || '-'}</div>
                                            </div>
                                        </div>

                                    )
                                })
                                :
                                <div>
                                    Không có khóa học nào khả dụng
                                </div>
                        }
                    </div>
                }
            </div>
        );
    };

    const onHidenDetail = () => {
        setVisibleRight(false);
        // setfilterBy2({ ...filterBy2, PageNumber: 1 });
        loadApi(indexImg);
        setdataCourse(dataCourseV1);
    }

    console.log('dataCourseV1', dataCourseV1)
    console.log('dataCourse', dataCourse)

    return (
        <>
            {
                dataLearning?.FeaturedCourseLst?.length > 0
                    ?
                    <div style={{ height: '80vh', overflow: 'auto', backgroundColor: 'white' }}>
                        <div style={{ width: '100%', height: 300, textAlign: 'center' }}>
                            <Image style={{ height: '100%', objectFit: 'cover' }}
                                src={dataLearning?.FeaturedCourseLst ? (dataLearning?.FeaturedCourseLst[indexImg].FilePath ? dataLearning?.FeaturedCourseLst[indexImg]?.FilePath : "/images/banner.png") : "/images/banner.png"}>
                            </Image>
                        </div>
                        <div>
                            <Tabs
                                activeTab={activeTab}
                                onTabClick={onTabClick}
                                hideNavBtnsOnMobile={false}
                            >
                                {
                                    dataLearning?.FeaturedCourseLst?.map((item, index) => (
                                        <Tab className={'rts___tab' + index} key={index}>{item?.NMFeaturedCourse.length > 30 ? item?.NMFeaturedCourse.substring(0, 30) + "..." : item?.NMFeaturedCourse}
                                            {item?.NMFeaturedCourse.length > 30 &&
                                                <Tooltip target={".rts___tab" + index}>
                                                    <div dangerouslySetInnerHTML={{ __html: item.NMFeaturedCourse }} ></div>
                                                </Tooltip>}
                                        </Tab>
                                    ))
                                }
                            </Tabs>
                            {dataLearning?.FeaturedCourseLst?.map((item, index) => (
                                <TabScreen activeTab={activeTab} idx={index} key={index} >
                                </TabScreen>
                            ))}
                            {visibleMore && (
                                <div className="loadMoreBtn" style={{ marginLeft: 12 }}>
                                    <a style={{ cursor: "pointer", color: 'blue' }} onClick={() => onShowMore()}>Xem nhiều hơn</a>
                                </div>
                            )}
                        </div>
                        <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => onHidenDetail()} position='right' style={{ width: '70%' }}>
                            {
                                <React.Fragment>
                                    <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                                    <LearningDetailContainer CloseLearningDetailCurrent={() => onHidenDetail()} isMyLearning={false} tabIndex={activeIndex1} idCourse={courseId} nameCourseType={courseType} isRated={isRated} courseLauchID={courseLauchID} />
                                </React.Fragment>
                            }
                        </Sidebar>
                    </div >
                    :
                    <div style={{ height: '80vh', overflow: 'auto', backgroundColor: 'white' }}>
                        <div style={{ padding: 20 }}>Không có chương trình/thông tin nổi bật nào</div>
                    </div>
            }

        </>

    )
}
export default FeaturedCourseContainer;