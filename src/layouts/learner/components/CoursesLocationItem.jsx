import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from './LearningDetailContainer';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import { CourseItemV2 } from '../my-learning/CourseItemV2';
import './style/MultiSelect.scss';
import './style/catalogue.scss';
import { NavLink, Routes, Outlet, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PanelMenu } from 'primereact/panelmenu';
import Image from "components/Image"
import { Link } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
const imglearn = window.location.origin + '/images/learn.png';
const CoursesLocationItem = (props) => {
    const { handleItemClick, onClickTitleIner, loading, showAll } = props;
    // const [loading, setLoading] = useState(false);
    const [dataCourse, setDataCourse] = useState(props.dataItem);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [countCurrent, setCountCurrent] = useState(props.dataItem.ListCourses.length / 5);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [filterBy1, setfilterBy1] = useState({
        MasterCoursesLocation: 0,
        PageNumber: 1,
        RecordsPerPage: 10,
        CoursesLocationTitle: ""
    });

    const LoaderCard = ({ title }) => {
        return (<Card style={{ boxShadow: 'none' }} className='' title={title}><ProgressSpinner className='w-100' style={{ width: '50px', height: '50px' }} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s" /> </Card>)
    }
    useEffect(() => {
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);

    }, [props.dataItem])

    const slider00 = useRef();
    let settingsCourse = {
        slideIndex: 0,
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        infinite: false,
        //variableWidth: true,
        //rtl: true,
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
    // next trang từ đây
    useEffect(() => {
        if (slider00.current) {
            // setIsLastSlide(currentSlide === 2 || currentSlide === 6 ? true : false);
            setIsLastSlide(currentSlide == Math.ceil(countCurrent) - 1 ? true : false);
        }
    }, [currentSlide]);

    const handleNextSlide = () => {
        if (slider00.current && currentSlide < slider00.current.props.children.length - 1) {
            slider00.current.slickNext();
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentSlide > 0 && slider00.current) {
            slider00.current.slickPrev();
            setCurrentSlide(currentSlide - 1);
        }
    }

    const loadApi = async (body) => {
        // setLoading(true);
        setDataCourse(props.dataItem)
        // setLoading(false);
    }

    const lstItem = (item) => {
        return (
            item.map((it, idx) => {
                if (it.Type == 'D') {
                    let url = "";

                    if (it?.URL_IMG == "" || it?.URL_IMG == null) {
                        if (it?.IS_FLDR == 0) {
                            url = window.location.origin + '/images/Bgr-folder-2.jpg'
                        }
                        else {
                            url = window.location.origin + '/images/Brg-folder-1.jpg'
                        }
                    }
                    else {
                        url = it?.URL_IMG.replace(/ImageWidth=125&ImageHeight=120/g, 'ImageWidth=375');;
                    }
                    return (<>
                        <div className="course-item d-flex flex-column justify-content-between ml-2 mr-2 mb-2 course-small-device">
                            <div className="bg-course d-flex justify-content-center">
                                <Image
                                    src={url}
                                ></Image>
                            </div>

                            <div className="d-flex flex-row justify-content-between flex-grow-1 ml-2 mr-2 pt-2">
                                <span onClick={() => showAll(it.CoursesLocationId, it.CoursesLocationTitle)} className="title-text fw-bold cursor-pointer" title={it?.CoursesLocationTitle} data-pr-tooltip="A Disabled Button" data-pr-position="top" dangerouslySetInnerHTML={{ __html: it?.CoursesLocationTitle }}>
                                </span>
                            </div>



                            {/* footer */}
                            <div className="d-flex flex-row justify-content-between m-2" style={{ marginBottom: 0 }}>
                                <div className="mr-1">

                                </div>

                                {/* {props.isMyLearning != false && */}
                                <div className="assign-status">
                                    {/* <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>{dataItem.LearningFlag || dataItem.Status}</span> */}
                                    <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>
                                        <i style={{ marginRight: '3px', verticalAlign: 'middle' }}></i>
                                        Thư mục
                                    </span>
                                </div>
                                {/* } */}
                            </div>
                        </div>
                    </>)
                }
                else {
                    return (<CourseItemV2 isMyLearning={false} onClickTitle={(data) => onClickTitleIner(data)} key={idx} dataItem={it} />)
                }
            })
        )
    }
    return (
        <>
            <LoadingPanel loading={loading} loader={<LoaderCard title={
                <div className='d-flex flex-row justify-content-between header-fix'>
                    <span onClick={() => showAll(dataCourse.CoursesLocationId, dataCourse.CoursesLocationTitle)} className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>{dataCourse.CoursesLocationTitle}</span>
                    <span className='d-flex flex-column align-self-center justify-content-end mr-3 fsx-10px text-uppercase'
                        style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500, cursor: 'pointer' }} onClick={() => showAll(dataCourse.CoursesLocationId, dataCourse.CoursesLocationTitle)}>
                        Xem tất cả({dataCourse.TotalRecords})
                    </span>
                </div>}
            />} >
                <Card style={{ boxShadow: 'none ' }} title={
                    <div className='d-flex flex-row justify-content-between header-fix'>
                        <span onClick={() => showAll(dataCourse.CoursesLocationId, dataCourse.CoursesLocationTitle)} className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>{dataCourse.CoursesLocationTitle}</span>
                        <span className='d-flex flex-column align-self-center justify-content-end mr-3 fsx-10px text-uppercase'
                            style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500, cursor: 'pointer' }} onClick={() => showAll(dataCourse.CoursesLocationId, dataCourse.CoursesLocationTitle)}>
                            Xem tất cả({dataCourse.TotalRecords})
                        </span>
                    </div>} className=''>
                    <div className='d-flex justify-content-end mr-5'>
                        <Button disabled={dataCourse.ListCourses.length <= 4 ? true : currentSlide == 0} onClick={() => handlePrevSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                        <Button disabled={dataCourse.ListCourses.length <= 4 ? true : isLastSlide} onClick={() => handleNextSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                    </div>
                    <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "10px" }}>
                        <div className="w-100 card-courseitems">
                            <LoadingPanel loading={loading}>
                                <Slider ref={slider00} {...settingsCourse} >
                                    {lstItem(dataCourse.ListCourses)}
                                </Slider>
                            </LoadingPanel>
                        </div>
                    </div>
                </Card>
            </LoadingPanel>
        </>
    )
}

CoursesLocationItem.propTypes = {
    onChange: PropTypes.func
};
CoursesLocationItem.defaultProps = {
    onChange: () => { }
}
CoursesLocationItem.propTypes = {
    onClickTitle: PropTypes.func
};
CoursesLocationItem.defaultProps = {
    onClickTitle: () => { }
}
CoursesLocationItem.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.number,
    nameCourseType: PropTypes.string,
};
export default CoursesLocationItem;