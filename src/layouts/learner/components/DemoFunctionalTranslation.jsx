import React, { useEffect, useState, useRef } from 'react';
import './style/demoFunctionalTranslation.scss';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SearchLeaner from './SearchLeaner';
import { CgCalendarDates } from "react-icons/cg";
import { Sidebar } from 'primereact/sidebar';
import Course from './Course';
import LearningDetailContainer from './LearningDetailContainer';
import { learnerService } from 'services/learnerService';
import { set } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
const imglearn = window.location.origin + '/images/learn.png';
// const SampleNextArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className="btn-back-next next" onClick={onClick}><span><FiArrowRight /></span></div>
//   );
// }

// const SamplePrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className="btn-back-next back" onClick={onClick}><span><FiArrowLeft /></span></div>
//   );
// }
const DemoFunctionalTranslation = (props) => {
    const { filterBy1 } = props;
    const [visibleRight, setVisibleRight] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [dataOngoingCourse, setdataOngoingCourse] = useState([])
    const [dataNotStartedCourse, setdataNotStartedCourse] = useState([])
    const [dataCompletedCourse, setdataCompletedourse] = useState([])
    const [dataExpired, setdataExpired] = useState([])
    const [dataWaitingApproval, setdataWaitingApproval] = useState([])
    const customeSlider = useRef();
    const customeSlider1 = useRef();
    const customeSlider2 = useRef();
    const customeSlider3 = useRef();
    const customeSlider4 = useRef();

    const gotoNext = (value) => {

        if (value == 0) {
            customeSlider.current.slickNext()
        } else if (value == 1) {
            customeSlider1.current.slickNext()
        } else if (value == 2) {
            customeSlider2.current.slickNext()
        } else if (value == 3) {
            customeSlider3.current.slickNext()
        } else if (value == 4) {
            customeSlider4.current.slickNext()
        }

    }

    const gotoPrev = (value) => {
        if (value == 0) {
            customeSlider.current.slickPrev()
        } else if (value == 1) {
            customeSlider1.current.slickPrev()
        } else if (value == 2) {
            customeSlider2.current.slickPrev()
        } else if (value == 3) {
            customeSlider3.current.slickPrev()
        } else if (value == 4) {
            customeSlider4.current.slickPrev()
        }
    }
    const [search, setsearch] = useState({
        "WebAppFlag": "W", filterBy: "0",
        "assignedFilterBy": "",
        "pageNumber": 1,
        "pageSize": 10,
        searchBy: "",
        sortBy: "RECENT",
        "statusBy": "A",
    })
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
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
    // useEffect(() => {
    //   // didmoutnt
    //   console.log('didmoutnt')
    // }, []);

    // useEffect(() => {
    //   // didmoutnt
    //   return () => {
    //     console.log('unmout')
    //   };
    // }, []);


    useEffect(() => {
        // call api here
        search.filterBy = filterBy1;
        setsearch(search)
        loadApi(search);

    }, [filterBy1]);



    const loadApi = async (value) => {
        //
        let result = await learnerService.getmylearnings(value);
        let result1 = await learnerService.getpendingforapprovallearnings(value);
        setdataOngoingCourse(result.data.LearningOngoingItems)
        setdataNotStartedCourse(result.data.LearningNotStartedItems)
        setdataCompletedourse(result.data.LearningCompletedItems)
        setdataWaitingApproval(result1.data.LearningItems)
        //console.log(dataOngoingCourse)
        // }else{
        //   setdataOngoingCourse([...dataOngoingCourse,...result.data.LearningOngoingItems])
        // setdataNotStartedCourse([...dataNotStartedCourse,...result.data.LearningNotStartedItems])
        // setdataCompletedourse([...dataCompletedCourse,...result.data.LearningCompletedItems])
        // }

    }
    function onclickTitle(data) {
        setCourseId(data);
        switch (data.CourseType) {
            case "T":
                //Lớp học tập trung
                setCourseId(data.ILTID);
                setCourseType(data.CourseType);
                break;
            default:
                setCourseId(data.ILTID);
                setCourseType(data.CourseType);
        }
        setVisibleRight(true);
    }
    function closeDetail() {
        setVisibleRight(false);
        loadApi(search);
    }
    function renderOngoingCourse() {
        return (
            dataOngoingCourse.map((dataItem, index) => {
                return (
                    <>
                        <Course onClickTitle={(data) => onclickTitle(data)} dataItem={dataItem} id={index}></Course>
                    </>
                )

            })
        )
    }
    function learningNotStartedItems() {
        return (
            dataNotStartedCourse.map((dataItem, index) => {
                return (
                    <>
                        <Course onClickTitle={(data) => onclickTitle(data)} dataItem={dataItem} id={index}></Course>
                    </>
                )

            })
        )
    }
    function learningCompletedItems() {
        return (
            dataCompletedCourse.map((dataItem, index) => {
                return (
                    <>
                        <Course onClickTitle={(data) => onclickTitle(data)} dataItem={dataItem} id={index}></Course>
                    </>
                )

            })
        )
    }
    function learningWaitingApproval() {
        return (
            dataWaitingApproval.map((dataItem, index) => {
                return (
                    <>
                        <Course onClickTitle={(data) => onclickTitle(data)} dataItem={dataItem} id={index}></Course>
                    </>
                )

            })
        )
    }
    function searchValue(keySearch) {
        console.log('keySearch', keySearch)
        search.searchBy = keySearch;
        setsearch(search);
        loadApi(search)
    }
    const onClickSortList = (sortBy) => {
        search.sortBy = sortBy;
        setsearch(search);
        loadApi(search)
    }
    return (
        <div className="card p-2">
            <div className="action">
                <SearchLeaner onChange={data => searchValue(data)} />
                <div className="date"><CgCalendarDates /></div>
                <div className="sort-dropdown dropdown">
                    <a style={{ cursor: 'pointer' }} className="recent dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Gần đây
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a onClick={() => onClickSortList('Recent')} className="dropdown-item" href="#">Gần đây</a></li>
                        <li><a onClick={() => onClickSortList('NAMEASC')} className="dropdown-item" href="#">A đến Z</a></li>
                        <li><a onClick={() => onClickSortList('NAMEDESC')} className="dropdown-item" href="#">Z đến A</a></li>
                        <li><a onClick={() => onClickSortList('EXPIRY')} className="dropdown-item" href="#">Ngày hết hạn</a></li>
                    </ul>
                </div>
            </div>
            {dataOngoingCourse.length > 0 ?
                <><div className="header-feature">
                    <div className="status"><span> ĐANG DIỄN RA</span></div>
                    <div className="count"><span>
                        <Link className="nav-link" to={'/learner/my-learning-all'}>
                            TẤT CẢ({dataOngoingCourse.length})
                        </Link>
                    </span></div>

                </div>
                    <div>
                        <a className="gotoNext" onClick={() => gotoNext(0)}><FiArrowRight /></a>
                        <a className="gotoPrev" onClick={() => gotoPrev(0)}><FiArrowLeft /></a>
                    </div>
                    <Slider className="slider-learner" ref={customeSlider} {...settings}>
                        {renderOngoingCourse()}
                    </Slider></> : ''}

            {dataNotStartedCourse.length > 0 ?
                <><div className="header-feature" style={{ marginTop: '3rem' }}>
                    <div className="status"><span > CHƯA BẮT ĐẦU</span></div>
                    <div className="count">
                        <span>
                            <Link className="nav-link" to={'/learner/my-learning-all'}>
                                TẤT CẢ({dataNotStartedCourse.length})
                            </Link>
                        </span>
                    </div>
                </div>
                    <div>
                        <a className="gotoNext" onClick={() => gotoNext(1)}><FiArrowRight /></a>
                        <a className="gotoPrev" onClick={() => gotoPrev(1)}><FiArrowLeft /></a>
                    </div>
                    <Slider className="slider-learner" ref={customeSlider1} {...settings}>
                        {learningNotStartedItems()}
                    </Slider></> : ''}

            {dataCompletedCourse.length > 0 ?
                <><div className="header-feature" style={{ marginTop: '3rem' }}>
                    <div className="status"><span > ĐÃ HOÀN THÀNH</span></div>
                    <div className="count"><span>
                        <Link className="nav-link" to={'/learner/my-learning-all'}>
                            TẤT CẢ({dataCompletedCourse.length})
                        </Link>
                    </span></div>
                </div>
                    <div>
                        <a className="gotoNext" onClick={() => gotoNext(2)}><FiArrowRight /></a>
                        <a className="gotoPrev" onClick={() => gotoPrev(2)}><FiArrowLeft /></a>
                    </div>
                    <Slider className="slider-learner" ref={customeSlider2} {...settings}>
                        {learningCompletedItems()}
                    </Slider></> : ''}
            {dataExpired.length > 0 ?
                <><div className="header-feature" style={{ marginTop: '3rem' }}>
                    <div className="status"><span > ĐÃ HẾT HẠN</span></div>
                    <div className="count"><span>
                        <Link className="nav-link" to={'/learner/my-learning-all'}>
                            TẤT CẢ({dataExpired.length})
                        </Link>
                    </span>
                    </div>
                </div>
                    <div>
                        <a className="gotoNext" onClick={() => gotoNext(3)}><FiArrowRight /></a>
                        <a className="gotoPrev" onClick={() => gotoPrev(3)}><FiArrowLeft /></a>
                    </div>
                    <Slider className="slider-learner" ref={customeSlider3} {...settings}>
                        <Course></Course>
                    </Slider></> : ''}
            {dataWaitingApproval.length > 0 ?
                <><div className="header-feature" style={{ marginTop: '3rem' }}>
                    <div className="status"><span > ĐANG CHỜ PHÊ DUYỆT</span></div>
                    <div className="count"><span>
                        <Link className="nav-link" to={'/learner/my-learning-all'}>
                            TẤT CẢ({dataWaitingApproval.length})
                        </Link>
                    </span></div>
                </div>
                    <div>
                        <a className="gotoNext" onClick={() => gotoNext(4)}><FiArrowRight /></a>
                        <a className="gotoPrev" onClick={() => gotoPrev(4)}><FiArrowLeft /></a>
                    </div>
                    <Slider className="slider-learner" ref={customeSlider4} {...settings}>
                        {learningWaitingApproval()}
                    </Slider></> : ''}

            <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                {
                    <React.Fragment>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} />
                    </React.Fragment>

                }
            </Sidebar>
        </div>
    )
}

export default DemoFunctionalTranslation